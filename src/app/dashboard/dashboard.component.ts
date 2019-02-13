import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateControlDialogueComponent} from '../create-control-dialogue/create-control-dialogue.component';

import {Board} from "../Board";
import {ControlConfiguration} from '../controlConfiguration';
import {BoardRequest} from "../boardRequest";
import {BoardBrokerServiceService} from "../board-broker-service.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private boardBrokerServiceService: BoardBrokerServiceService) {
  }

  @Input() currentBoard: Board;

  ngOnInit() {
  }

  // Controls present on the dashboard
  controlsCol1: Array<ControlConfiguration> = [];
  controlsCol2: Array<ControlConfiguration> = [];

  /**
   * boardRequest
   *
   * Handle requests from the controls within this dash and pass the events on to the  boardBrokerService
   * that will handle the requested operations
   *
   * @param passedBoardRequest  BoardRequest
   */
  async boardRequest(passedBoardRequest: BoardRequest) {
    await this.boardBrokerServiceService.boardRequest(passedBoardRequest)

  }


  async openDialog() {
    const dialogRef = this.dialog.open(CreateControlDialogueComponent, {
      width: '250px',
      data: {bestCake: 'LemonDrizzled', worstCake: 'Fire'}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
      this.controlsCol1.push(result);

      // Request that the board pin be updated
      this.boardBrokerServiceService.setPinConfiguration(result.boardPin, 'OUTPUT')
        .then(() => {

        }).catch(err => {
        console.error(err);
        console.error('Failed to set pin');

      })
    });
  }

  drop(event: CdkDragDrop<ControlConfiguration[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
    }
  }

}
