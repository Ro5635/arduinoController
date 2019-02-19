import {PIN_STATES} from "./PIN_STATES_ENUM";

export class BoardPin {
  private provisioned: boolean = false;
  private pinName: string;
  private state: PIN_STATES;
  private supportedModes: object = {};

  constructor(pinName, supportedModes: Array<string>) {
    this.pinName = pinName;

    // Add each passed supported mode
    for (let mode of Object.values(supportedModes)) {
      this.supportedModes[mode] = 1;
    }

  }

  /**
   * ModeIsSupported
   *
   * Returns a boolean indicating if the passed mode
   * is supported by the pin
   *
   * @param mode
   * @OUTPUT Boolean    Pin supports passed mode
   */
  modeIsSupported(mode) {
    return this.supportedModes[mode] === 1;

  }

  /**
   * Add new Supported Mode
   *
   * This allows the addition of a further supported mode after
   * creation.
   *
   * @param newMode PIN_STATES enum   e.g: INPUT
   */
  addSupportedMode(newMode: string) {
    this.supportedModes[newMode] = 1;
  }

  isProvisioned() {
    return this.provisioned;
  }

  getName() {
    return this.pinName;
  }

  getState() {
    return this.state;
  }

  /**
   * provisionPin
   *
   * Attempts to provision pin to the passed state,  can only provision
   * pins to a supported state. You CAN re-provision a already provisioned
   * pin.
   *
   * @param state     State to provision pin, PIN_STATES enum e.g: "OUTPUT"
   */
  provisionPin(state: PIN_STATES): boolean {
    this.provisioned = true;

    if (this.modeIsSupported(state)) {
      this.state = state;
      return true;

    }

    return false;

  }

  freePin() {
    this.provisioned = false;

  }
}
