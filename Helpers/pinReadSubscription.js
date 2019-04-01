//TODO: This entire process of reading from the Arduino was written at 2AM to meet the deadline, the whole thing requires replacement....

// Subscription
//	JSON:
//	interval: number of seconds
//  pinTarget: number
//	nextReadDue: Date
//  serialHelper instance
//

let subscriptions = [];

setInterval(checkForDueReads, 1000);

function checkForDueReads() {
  for (let subscription of subscriptions) {
    const now =  Date();

    if (subscription.nextReadDue > now) {

      // Update readDueDate
      subscription.nextReadDue.setSeconds( subscription.nextReadDue.getSeconds() + subscription.interval);

      // Request Read
      subscription.serialHelper.writeLine(`#14#1#${subscription.pinTarget}`);

    }

  }

}

exports.registerSubscription = (newSubscription) => {
  if (!newSubscription.interval  || newSubscription.interval < 1) {
    console.error('Invalid subscription provided, cannot register subscription');
    console.error('Subscription missing required fields');
  }

  if (newSubscription.pinTarget.indexOf("A") >= 0) {
    // Need to convert pin number to base 10 form
    let target = newSubscription.pinTarget;

    let targetNumOnly = target.replace('A', '');

    const convertedPinNum = +targetNumOnly + 54;

    console.log(`Converted pin number to: ${convertedPinNum}`);
    newSubscription.pinTarget = convertedPinNum;

  }

  subscriptions.push(newSubscription);

};



module.exports = exports;
