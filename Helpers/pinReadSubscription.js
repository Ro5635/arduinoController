//TODO: This entire process of reading from the Arduino was written at 2AM to meet the deadline, the whole thing requires replacement....

// Subscription
//	JSON:
//	interval: number of seconds
//  pinTarget: number
//	nextReadDue: Date
//  serialHelper instance
// forWidgetID: widgetID
//

let subscriptions = [];
let serialWriteHelper;

setInterval(checkForDueReads, 250);

function checkForDueReads() {
  for (let subscription of subscriptions) {
    const now = new Date();

    if (subscription.nextReadDue < now) {

      // Update readDueDate
      subscription.nextReadDue.setSeconds(subscription.nextReadDue.getSeconds() + subscription.interval);

      // Request Read
      // console.log(`WRITING THIS: #14#1#${subscription.pinTarget}#`);
      if (serialWriteHelper) {
        serialWriteHelper(`#14#1#${subscription.pinTarget}#`);

      } else {
        console.log('Cannot write to micro-controller, not provided with serialWriteHelper');
      }

    }

  }

}

exports.registerSubscription = (newSubscription) => {
  if (!newSubscription.interval || newSubscription.interval < 1) {
    console.error('Invalid subscription provided, cannot register subscription');
    console.error('Subscription missing required fields');
  }

  // if (newSubscription.pinTarget.indexOf("A") >= 0) { // Logic moved upwards
  //   // Need to convert pin number to base 10 form
  //   let target = newSubscription.pinTarget;
  //
  //   let targetNumOnly = target.replace('A', '');
  //
  //   const convertedPinNum = +targetNumOnly + 54;
  //
  //   console.log(`Converted pin number to: ${convertedPinNum}`);
  //   newSubscription.pinTarget = convertedPinNum;
  //
  // }

  // Remove any existing subscription for this widgetID
  subscriptions = subscriptions.filter(subscription => {
    return subscription.forWidgetID !== newSubscription.forWidgetID;
  });

  subscriptions.push(newSubscription);

};


/**
 * provideSerialWriteHelper
 *
 * Provide an active serial writeline function for use communicating with the board
 * @param newSerialWriteHelper
 */
exports.provideSerialWriteHelper = (newSerialWriteHelper) => {
  serialWriteHelper = newSerialWriteHelper;
};


/**
 * clearAllSubscriptions
 *
 * Removes all active subscriptions
 */
exports.clearAllSubscriptions = () => {
  subscriptions = [];
};


module.exports = exports;
