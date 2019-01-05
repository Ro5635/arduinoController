import {BoardRequest} from "./boardRequest";

export class Board {
  name: string;
  boardID: string;
  boardBrandName: string;
  digitalPins: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
  analogPins: Array<string> = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
  comPort: string;

  private comPortIsOpen: boolean = false;

  constructor(boardID, name, boardBrandName, digitalPins, analogPins, comPort) {
    this.boardID = boardID;
    this.name = name;
    this.boardBrandName = boardBrandName;
    this.digitalPins = digitalPins;
    this.analogPins = analogPins;
    this.comPort = comPort;

  }

  passRequest(request: BoardRequest): boolean {
    //
    // if (!this.comPortIsOpen) {
    //   this._electronService.ipcRenderer.send('serialOperations', [{taskName: 'openPort', comPort: 'COM3'}]);
    //   // Assumes the above will eventually work...
    //   this.comPortIsOpen = true;
    // }
    //
    // this._electronService.ipcRenderer.send('serialOperations', [{
    //   taskName: 'writeLine',
    //   line: `#12#2#${request.boardPin}#${request.newState}#`
    // }]);

    return true;
  }
}
