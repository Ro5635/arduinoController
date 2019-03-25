import {Board} from "./Board";

export class ConnectedBoard extends Board {
  comPort: string;
  usbID: string;


  constructor(boardBrandName, digitalPins, analogPins, pwmPins, fqbn, comPort, usbID) {
    super(boardBrandName, digitalPins, analogPins, pwmPins, fqbn);
    this.comPort = comPort;
    this.usbID = usbID;

  }

  /**
   * getSerialised
   *
   * gets a serialised representation of the board
   * Call parent class for serialisation of core fields
   */
  getSerialised() {
    // Get the serialisedBoard from parent
    let serialisedBoard = super.getSerialised();

    // Now add sub class specific attributes
    serialisedBoard['comPort'] = this.comPort;
    serialisedBoard['name'] = 'NOT_IMPLEMENTED_YET';

    return serialisedBoard;

  }

}
