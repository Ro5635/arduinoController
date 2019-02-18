import {Board} from "./Board";

export class UserBoard extends Board {
  name: string;
  boardID: string;
  comPort: string;


  constructor(boardID, name, boardBrandName, digitalPins, analogPins, pwmPins, fqbn, comPort) {
    super(boardBrandName, digitalPins, analogPins, pwmPins, fqbn);
    this.boardID = boardID;
    this.name = name;
    this.comPort = comPort;
    this.pwmPins = pwmPins;
    this.fqbn = fqbn;

  }

}
