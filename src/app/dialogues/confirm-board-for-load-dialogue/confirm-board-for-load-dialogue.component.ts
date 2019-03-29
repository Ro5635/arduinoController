import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";

export class BoardConfirmDialogData {
  board: ConnectedBoard;

  constructor() {

  }
}

@Component({
  selector: 'app-confirm-board-for-load-dialogue',
  templateUrl: './confirm-board-for-load-dialogue.component.html',
  styleUrls: ['./confirm-board-for-load-dialogue.component.scss']
})
export class ConfirmBoardForLoadDialogueComponent implements OnInit {
  currentBoard: ConnectedBoard;

  constructor(public dialogRef: MatDialogRef<ConfirmBoardForLoadDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardConfirmDialogData) {
    this.currentBoard = data.board;
  }

  /**
   * userBoardLoadResponse
   *
   * User selected to confirm the board load, return this.
   */
  userBoardLoadResponse(userConfirmedLoad: boolean){
    this.dialogRef.close({confirmBoardLoad: userConfirmedLoad});

  }

  ngOnInit() {
  }

}
