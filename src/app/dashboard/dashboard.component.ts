import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateControlDialogueComponent} from '../create-control-dialogue/create-control-dialogue.component';

import {Board} from "../Board";
import {ControlConfiguration} from '../controlConfiguration';
import {BoardRequest} from "../boardRequest";

import {BoardBrokerServiceService} from "../board-broker-service.service";

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

  constructor(public dialog: MatDialog, private boardBrokerServiceService: BoardBrokerServiceService) {
  }

  @Input() currentBoard: Board;

  ngOnInit() {}

  controls: Array<ControlConfiguration> = [];
  serialPortOpen: boolean = false;


  boardRequest(passedBoardRequest: BoardRequest): void {


    this.boardBrokerServiceService.boardRequest(passedBoardRequest)
      .subscribe(response => console.log(`service returned: ${response}`));


  }


  openDialog(): void {
    const dialogRef = this.dialog.open(CreateControlDialogueComponent, {
      width: '250px',
      data: {bestCake: 'LemonDrizzled', worstCake: 'Fire'}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
      this.controls.push(result);

      // Request that the board pin be updated
      this.boardBrokerServiceService.setPinConfiguration(result.boardPin, 'OUTPUT')
        .subscribe(boardSetupSucceded => console.log(`Result of the board set up: ${boardSetupSucceded}`));

    });
  }


}
