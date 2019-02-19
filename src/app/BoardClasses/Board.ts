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
   *
   * @param provisioned
   * @param pinMode
   */
  getPins(provisioned: boolean, pinMode: string = undefined) {
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
      return filteredPinArray;

    } else {
      // Apply a pinMode filter
      filteredPinArray = filteredPinArray.filter(pin => pin.modeIsSupported(pinMode));

      // Return the array after the additional filter
      return filteredPinArray;

    }

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


}

