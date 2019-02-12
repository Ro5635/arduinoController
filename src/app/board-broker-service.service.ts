import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ElectronService} from "ngx-electron";
import {BoardRequest} from "./boardRequest";
import {ArduinoCLIBoard} from "./ArduinoCLIBoard";


@Injectable({
  providedIn: 'root'
})
export class BoardBrokerServiceService {

  constructor(private _electronService: ElectronService) {

    // Attempt to open the serial port
    this.openSerialPort();

  }

  serialPortOpen: boolean = false;

  /**
   * boardRequest
   *
   * Facilitates passing a general board request
   *
   * @param passedBoardRequest
   */
  boardRequest(passedBoardRequest: BoardRequest): Observable<string> {

    // this.currentBoard.passRequest(passedBoardRequest);

    console.log(`Requesting following line written: #12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`);

    if (!this.serialPortOpen) {
      this.openSerialPort();

    }

    this._electronService.ipcRenderer.send('serialOperations', [{
      taskName: 'writeLine',
      line: `#12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`
    }]);


    return of('test');

  }

  /**
   * setPinConfiguration
   *
   * Set pin state, pass string pin name and desired state
   *
   * @param pinName       string    e.g: '13'
   * @param newPinState   string    MUST BE: 'OUTPUT' OR 'INPUT'
   * @returns Success     boolean   Did the operation succeed
   */
  setPinConfiguration(pinName: string, newPinState: string): Observable<boolean> {
    let operationID;

    if (newPinState === 'OUTPUT') {
      operationID = 11;

    } else if (newPinState === 'INPUT') {
      operationID = 10;

    } else {
      throw new Error('Unrecognised pin state requested, unable to setPinConfiguration');

    }

    this._electronService.ipcRenderer.send('serialOperations', [{
      taskName: 'writeLine',
      line: `#${operationID}#1#${pinName}#`
    }]);

    // Handle passing back
    return of(true);
  }

  openSerialPort(): void {
    if (!this.serialPortOpen) {
      this._electronService.ipcRenderer.send('serialOperations', [{taskName: 'openPort', comPort: 'COM3'}]);
      // Assumes the above will eventually work, this is the cause of manny of the current bugs
      //TODO: build in a wait on and parse serial response mechanism
      this.serialPortOpen = true;

    }
  }

  /**
   * getConnectedBoards
   *
   * Gets the boards connected to this PC
   */
  getConnectedBoards(): Promise<ArduinoCLIBoard[]> {
    return new Promise((resolve, reject) => {
      // Request the board scan
      this._electronService.ipcRenderer.send('arduinoOperations', [{taskName: 'boardScan'}]);

      // Register a listener
      this._electronService.ipcRenderer.on('boardsFound', (event, message: ArduinoCLIBoard[]) => {

        const boards: ArduinoCLIBoard[] = message;
        resolve(boards);


      });
    });
  }

}
