import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ControlConfiguration} from '../controlConfiguration';

@Component({
  selector: 'app-create-control-dialogue',
  templateUrl: './create-control-dialogue.component.html',
  styleUrls: ['./create-control-dialogue.component.scss']
})
export class CreateControlDialogueComponent implements OnInit {
  // This form will be replaced later so this will do for now
  controlTypes: object[] = [{value: 'Slider'}, {value: 'Button'}];

  constructor(public dialogRef: MatDialogRef<CreateControlDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  requestedConfig: ControlConfiguration = {boardPin: '', controlType: '', name: ''};

  confirmSelection() {
    this.dialogRef.close(this.requestedConfig);
  }

  ngOnInit() {
  }

}
