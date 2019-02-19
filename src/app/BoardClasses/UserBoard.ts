import {Board} from "./Board";

export class UserBoard extends Board {
  name: string;
  boardID: string;
  comPort: string;

  constructor(boardID, name, boardBrandName, digitalPins, analogPins, pwmPins, fqbn, comPort) {
    super(boardBrandName, digitalPins, analogPins, pwmPins, fqbn);
    this.name = name;
    this.boardID = boardID;
    this.comPort = comPort;

  }

}
