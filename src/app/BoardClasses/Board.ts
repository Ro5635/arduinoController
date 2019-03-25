import {BoardPin} from "./BoardPin";
import {PIN_STATES} from "./PIN_STATES_ENUM";

export class Board {
  public boardBrandName: string;
  public fqbn: string;

  private pins = {};

  constructor(boardBrandName: string, digitalPins: Array<string>, analogPins: Array<string>, pwmPins: Array<string>, fqbn: string) {
    this.boardBrandName = boardBrandName;
    this.fqbn = fqbn;

    // Function to set the pins
    const configureNewPins = (pinNames: Array<string>, currentMode: string) => {
      for (let pinName of pinNames) {

        if (this.pins[pinName]) {
          // Pin already exists in pin map
          // Add the new supported mode
          this.pins[pinName].addSupportedMode(currentMode);

        } else {
          // The pin has not been created yet
          this.pins[pinName] = new BoardPin(pinName, [currentMode]);

        }
      }
    };

    // Call set the pins function for each provided pin type
    configureNewPins(digitalPins, 'DIGITAL');
    configureNewPins(analogPins, 'ANALOG');
    configureNewPins(pwmPins, 'PWM');


  }

  /**
   * getAllPins
   *
   * Gets all of the pins registered to the board as an array of BoardPins
   * @returns Array<BoardPin>
   */
  getAllPins() {
    // Just return all of the pins as an Array
    return Object.values(this.pins);

  }

  /**
   * getPins
   *
   * Returns an array of pins that match the provided filter criteria
   *
   * @param provisioned  boolean
   * @param pinMode string optional filter examples: 'DIGITAL', 'ANALOG', 'PWM'
   * @param rawPinNameArray boolean option  should response be of raw form ['33', '55', '33'] or Object form [BoardPin]
   */
  getPins(provisioned: boolean, pinMode: string = undefined, rawPinNameArray = true) {
    if (provisioned === undefined) {
      console.error('Failed to complete getPins method signature, missing provisioned: boolean');
      return [];

    }

    // Create an Array of all the pins registered to this board
    const arrayOfPins: Array<BoardPin> = Object.values(this.pins);

    let filteredPinArray: Array<BoardPin>;

    // Filter based on provisioned state
    if (provisioned) {
      filteredPinArray = arrayOfPins.filter(pin => pin.isProvisioned());

    } else {
      filteredPinArray = arrayOfPins.filter(pin => !pin.isProvisioned());

    }

    // Handle potential pinMode filtering
    if (pinMode === undefined) {
      // No pinMode filter to be applied
      if (rawPinNameArray) {
        return this.convertBoardPinsToPinNameArray(filteredPinArray);

      }
      return filteredPinArray;

    } else {
      // Apply a pinMode filter
      filteredPinArray = filteredPinArray.filter(pin => pin.modeIsSupported(pinMode));

      // Return the array after the additional filter
      if (rawPinNameArray) {
        return this.convertBoardPinsToPinNameArray(filteredPinArray);
      }
      return filteredPinArray;

    }

  }


  /**
   * convertBoardPinsToPinNameArray
   *
   * Converts an array of BoardPins into an array of pin names
   * outputs ['A2', 3, 5, 6]
   * @param boardPinsArray  [BoardPin]
   */
  private convertBoardPinsToPinNameArray(boardPinsArray) {
    let pinsNameArray = [];

    for (let pin of boardPinsArray) {
      pinsNameArray.push(pin.pinName);

    }

    return pinsNameArray;

  }

  getPin(pinName: string) {
    return this.pins[pinName];

  }


  /**
   * ProvisionPin
   *
   * Provision the passed pin name, this removes it from the available pins, if it is already provisioned
   * it will simply be re-provisioned.
   *
   * @param pinName       string     Example: 'A0'
   * @param pinState      PIN_STATES Enum
   * @returns success     Boolean
   */
  provisionPin(pinName: string, pinState: PIN_STATES): boolean {

    const pin: BoardPin = this.pins[pinName];

    if (pin) {
      pin.provisionPin(pinState);


      return true;

    }

    console.error('Failed to find pin');
    // Return failure
    return false;

  }

  /**
   * freePin
   *
   * Free the provisioned pin passed by name, this puts it in the available pins.
   * The pin must be currently in the allocated state, pins cannot be added to the
   * board this way.
   *
   * @param pinName     string  example 'A0'
   */
  freePin(pinName: string) {

    const pin: BoardPin = this.pins[pinName];

    if (pin) {
      // Found in, free it
      pin.freePin();
      return true;
    }

    console.error('Failed to find pin');
    //return failure to free passed pin name
    return false;

  }

  /**
   * getSerialised
   *
   * Gets the state of the Board in a serialised form in a JSON object, as expected by the BoardInput type on the
   * graphQL API's
   */
  getSerialised() {
    let serialisedForm = {};

    serialisedForm['boardID'] = 'NotImplementedYet';
    serialisedForm['boardBrandName'] = this.boardBrandName;
    serialisedForm['digitalPins'] = this.getPins(false, 'DIGITAL');
    serialisedForm['analogPins'] = this.getPins(false, 'ANALOG');
    serialisedForm['pwmPins'] = this.getPins(false, 'PWM');
    serialisedForm['fqbn'] = this.fqbn;

    // Additional params should be provided by sub classes
    // serialisedForm['name'] = this.
    // serialisedForm['comPort'] = '';

    return serialisedForm;


  }


}

