import {Injectable} from '@angular/core';
import {ElectronService} from "ngx-electron";
import {BoardRequest} from "./BoardClasses/boardRequest";
import {ArduinoCLIBoard} from "./BoardClasses/ArduinoCLIBoard";
import {ConnectedBoard} from "./BoardClasses/ConnectedBoard";
import {Observable} from "rxjs";

/**
 * TODO: re-write at a later time to use rxjs observables for consistency with all the other services
 * within this application
 */

@Injectable({
  providedIn: 'root'
})
export class BoardBrokerServiceService {
  currentBoard: ConnectedBoard;

  constructor(private _electronService: ElectronService) {

    // Attempt to open the serial port
    // this.openSerialPort();mai

  }

  private serialPortOpen: boolean = false;

  /**
   * boardRequest
   *
   * Facilitates passing a general board request
   * TODO: This method is going to be entirely overhauled, so in the mean time a switch is used on type
   * @param passedBoardRequest
   */
  async boardRequest(passedBoardRequest: BoardRequest): Promise<any> {
    await this.prepareForUse();

    return new Promise((resolve, reject) => {
      // this.currentBoard.passRequest(passedBoardRequest);


      switch (passedBoardRequest.controlType) {
        case 'Button':
          console.log(`Requesting following line written: #12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`);

          this._electronService.ipcRenderer.send('serialOperations', [{
            taskName: 'writeLine',
            line: `#12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`
          }]);

          break;

        case 'Slider':
          console.log(`Requesting following line written: #13#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`);

          this._electronService.ipcRenderer.send('serialOperations', [{
            taskName: 'writeLine',
            line: `#13#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`
          }]);

          break;
        default:
          console.error('Unable to identify operation');
          return reject();

      }


      return resolve();

    });


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
  async setPinConfiguration(pinName: string, newPinState: string): Promise<any> {
    await this.prepareForUse();

    return new Promise((resolve, reject) => {
      let operationID;


      if (newPinState === 'OUTPUT') {
        operationID = 11;

      } else if (newPinState === 'INPUT') {
        operationID = 10;

      } else {
        console.error(new Error('Unrecognised pin state requested, unable to setPinConfiguration'));
        return reject()

      }

      this._electronService.ipcRenderer.send('serialOperations', [{
        taskName: 'writeLine',
        line: `#${operationID}#1#${pinName}#`
      }]);


      return resolve();


    });


  }

  /**
   * prepareForUse
   *
   * Ensure that the service is ready and the serial port is open
   * CANNOT USE ASYNC AWAIT ON THIS...
   */
  private prepareForUse(): Promise<void> {
    return new Promise((resolve, reject) => {

      if (!this.serialPortOpen) {
        this.openSerialPort().then(() => {
          return resolve();

        }).catch(() => {
          return reject();

        })

      }
      return resolve();

    });
  }

  private openSerialPort(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.serialPortOpen) {
        this._electronService.ipcRenderer.send('serialOperations', [{
          taskName: 'openPort',
          comPort: this.currentBoard.comPort
        }]);

        // Register a listener
        this._electronService.ipcRenderer.on('serialOperations-openPort', (event, message) => {
          if (message.success) {
            this.serialPortOpen = true;
            resolve();
          }
          reject();

        });


      }

    });
  }

  /**
   * setBoard
   *
   * Set the board for the service to target
   *
   * @param targetBoard
   */
  setBoard(targetBoard: ConnectedBoard): Observable<void> {
    return new Observable(observer => {
      this.serialPortOpen = false;
      this.currentBoard = targetBoard;
      this.openSerialPort()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((err) => {
          console.error(err);
          observer.error('Failed to set board');
        })

    });


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

  /**
   * programmeBoard
   *
   * Programmes the arduino connected to the past port
   *
   * TODO: Accept arduino parameters such as fqbn for use in compile and upload
   * @param board
   */
  programmeBoard(board: ConnectedBoard): Promise<boolean> {
    return new Promise((resolve, reject) => {

      // Request the CLI preparation and sketch upload
      this._electronService.ipcRenderer.send('arduinoOperations', [{
        taskName: 'prepareArduinoCLIAndUpload',
        "board": board
      }]);

      // Register a listener
      this._electronService.ipcRenderer.on('boardUpload', (event, message) => {
        const success = message.uploadSuccess;
        resolve(success)

      });

    });

  }

}
