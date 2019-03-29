import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Dashboard} from "../../Dashboard";
import {DialogData} from "../../dialogues/confirm-dialogue/confirm-dialogue.component";
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";

export class BoardConfigDialogData {
  currentDashboard: Dashboard;

  constructor() {

  }
}

@Component({
  selector: 'app-board-configurator-dialogue-wrapper',
  templateUrl: './board-configurator-dialogue-wrapper.component.html',
  styleUrls: ['./board-configurator-dialogue-wrapper.component.scss']
})
export class BoardConfiguratorDialogueWrapperComponent implements OnInit {
  currentDashboard: Dashboard;

  constructor(public dialogRef: MatDialogRef<BoardConfiguratorDialogueWrapperComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardConfigDialogData) { }

  ngOnInit() {
    this.currentDashboard = this.data.currentDashboard;
  }

  boardSetupCompleteEvent(): void {
    // Close this dialogue
    this.dialogRef.close(true);
  }

}
