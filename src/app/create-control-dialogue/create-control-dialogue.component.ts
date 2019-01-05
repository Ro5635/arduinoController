import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ControlConfiguration} from './../controlConfiguration';

@Component({
  selector: 'app-create-control-dialogue',
  templateUrl: './create-control-dialogue.component.html',
  styleUrls: ['./create-control-dialogue.component.scss']
})
export class CreateControlDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateControlDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  config: ControlConfiguration = {boardPin: '10', controlType: 'Button', name: 'LED State'};

  confirmSelection() {
    this.dialogRef.close(this.config);
  }

  ngOnInit() {
  }

}
