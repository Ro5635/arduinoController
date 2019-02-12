import {Board} from "./Board";

export class UserBoard extends Board {
  name: string;
  boardID: string;
  comPort: string;


  constructor(boardID, name, boardBrandName, digitalPins, analogPins, comPort) {
    super(boardBrandName, digitalPins, analogPins);
    this.boardID = boardID;
    this.name = name;
    this.comPort = comPort;

  }

}
