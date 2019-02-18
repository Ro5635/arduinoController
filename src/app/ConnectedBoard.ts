import {Board} from "./Board";

export class ConnectedBoard extends Board {
  comPort: string;
  usbID: string;


  constructor(boardBrandName, digitalPins, analogPins, pwmPins, fqbn, comPort, usbID) {
    super(boardBrandName, digitalPins, analogPins, pwmPins, fqbn);
    this.comPort = comPort;
    this.usbID = usbID;

  }

}
