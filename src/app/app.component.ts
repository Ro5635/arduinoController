import {Component, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateControlDialogueComponent} from './create-control-dialogue/create-control-dialogue.component';

import {ElectronService} from 'ngx-electron';

import {ControlConfiguration} from './controlConfiguration';
import {BoardRequest} from "./boardRequest";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  buttControls: Array<ControlConfiguration> = [];

  constructor(public dialog: MatDialog, private _electronService: ElectronService) {
  }

  serialPortOpen: boolean = false;

  boardRequest(boardRequest: BoardRequest): void {

    if (!this.serialPortOpen) {
      this.openSerialPort();

    }

    console.log(`Requesting following line written: #12#2#${boardRequest.boardPin}#${boardRequest.newState}#`);


    this._electronService.ipcRenderer.send('serialOperations', [{
      taskName: 'writeLine',
      line: `#12#2#${boardRequest.boardPin}#${boardRequest.newState}#`
    }]);

  }

  openSerialPort(): void {
    if (!this.serialPortOpen) {
      this._electronService.ipcRenderer.send('serialOperations', [{taskName: 'openPort', comPort: 'COM3'}]);
      // Assumes the above will eventually work
      this.serialPortOpen = true;

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateControlDialogueComponent, {
      width: '250px',
      data: {bestCake: 'LemonDrizzled', worstCake: 'Fire'}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
      switch (result.controlType) {

        case 'Button':
          this.buttControls.push(result);

          // TMP hacks during dev ...
          if (!this.serialPortOpen) {
            this.openSerialPort();

          }

          setTimeout(() => {
            // Need to set the selected pin to a DigitalWrite pin
            this._electronService.ipcRenderer.send('serialOperations', [{
              taskName: 'writeLine',
              line: `#11#1#${result.boardPin}#`
            }]);
          }, 2000);


          break;
      }
    });
  }

}
