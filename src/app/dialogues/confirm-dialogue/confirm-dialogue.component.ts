import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/**
 * Confirm Dialogue Component
 *
 * This is intended to be a generic dialogue with confirm and cancel buttons, supply the title and body text using
 * the data injectable, an example of the data injectable is shown below:
 *
 * data: {dialogueBodyText: 'This action is permanent, are you sure you want to proceed?', dialogueTitle: 'Delete Dashboard?'}
 */

export class DialogResponse {
  userConfirmed: boolean;

  constructor() {

  }
}

export class DialogData {
  dialogueTitle: string;
  dialogueBodyText: string;

  constructor() {

  }
}


@Component({
  selector: 'app-confirm-dialogue',
  templateUrl: './confirm-dialogue.component.html',
  styleUrls: ['./confirm-dialogue.component.scss']
})
export class ConfirmDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
  }

  sendUserSelectionAndClose(userConfirmed: boolean): void {
    let data: DialogResponse = new DialogResponse();
    data.userConfirmed = userConfirmed;
    this.dialogRef.close(data);

  }

}
