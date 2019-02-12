import {Board} from "./Board";

export class ConnectedBorad extends Board {
  comPort: string;


  constructor(boardBrandName, digitalPins, analogPins, comPort) {
    super(boardBrandName, digitalPins, analogPins);
    this.comPort = comPort;

  }

}