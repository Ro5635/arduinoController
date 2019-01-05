import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateControlDialogueComponent} from '../create-control-dialogue/create-control-dialogue.component';

import {Board} from "../Board";
import {ControlConfiguration} from '../controlConfiguration';
import {BoardRequest} from "../boardRequest";
import {ElectronService} from "ngx-electron";

/**
 *  TODO: Replace the serial port handling
 *
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private _electronService: ElectronService) {
  }

  @Input() currentBoard: Board;

  ngOnInit() {

    // If a com port is supplied open it
    if (this.currentBoard.comPort) {
      this.openSerialPort();


    }

  }

  controls: Array<ControlConfiguration> = [];
  serialPortOpen: boolean = false;


  boardRequest(passedBoardRequest: BoardRequest): void {

    // this.currentBoard.passRequest(passedBoardRequest);

    console.log(`Requesting following line written: #12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`);

    if (!this.serialPortOpen) {
      this.openSerialPort();

    }

    this._electronService.ipcRenderer.send('serialOperations', [{
      taskName: 'writeLine',
      line: `#12#2#${passedBoardRequest.boardPin}#${passedBoardRequest.newState}#`
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
      this.controls.push(result);

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


    });
  }


}
