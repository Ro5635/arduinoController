import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Widget} from "../../../Widget";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../../../dialogues/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-graph-widget-settings',
  templateUrl: './graph-widget-settings.component.html',
  styleUrls: ['./graph-widget-settings.component.scss']
})
export class GraphWidgetSettingsComponent implements OnInit {
  widget: Widget;

  availableChartTypes = [{name: 'bar', displayName: 'Bar Chart'}, {name: 'line', displayName: 'Line Graph'}];
  availableIntervals = [{value: 1, displayName: '1 second'}, {value: 2, displayName: '2 Seconds'}, {value: 5, displayName: '5 Seconds'}, {value: 10, displayName: '10 Seconds'}, {value: 30, displayName: '30 Seconds'}, {value: 60, displayName: '1 Minute'}, {value: 900, displayName: '5 Minutes'}];
  availableDataLengths = [{value: 25, displayName: 'Standard 25 Items'}, {value: 5, displayName: 'Standard 5 Items'}, {value: 50, displayName: 'Silver Subscription 50 Items'}, {value: 500, displayName: 'Gold Subscription 500 Items'}];
  graphSettingsForm: FormGroup;


  constructor(private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<GraphWidgetSettingsComponent>) { }

  ngOnInit() {

    // Extract the provided widget from dialog data
    this.widget = this.data['widget'];

    this.graphSettingsForm = this._formBuilder.group({
      dataLength: new FormControl(this.widget.state['dataLength'], [Validators.required]),
      graphType: new FormControl(this.widget.state['chartType'], [Validators.required]),
      updateInterval: new FormControl(this.widget.state['interval'], [Validators.required])
    })
  }

  updateGraphWidgetSettings(chartType: string, dataLength: number, updateInterval: number) {
    this.widget.state['dataLength'] = dataLength;
    this.widget.state['chartType'] = chartType;
    this.widget.state['interval'] = updateInterval;

    this.dialogRef.close(this.widget);

  }

  closeDialogue(){
    this.dialogRef.close();
  }

}
