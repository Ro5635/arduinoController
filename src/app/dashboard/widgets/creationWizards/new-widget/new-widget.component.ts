import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from "@angular/material";
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.scss']
})
export class NewWidgetComponent implements OnInit {
  selectedNewWidgetType;
  currentBoard: ConnectedBoard;
  currentDashboard: Dashboard;
  widgets = [{name: "Button"}, {name: "Slider"}, {name: "Traffic Light"}, {name: "Graph"}];

  constructor(public dialogRef: MatDialogRef<NewWidgetComponent>,  @Inject(MAT_DIALOG_DATA) public data) {
    this.currentBoard = data.currentBoard;
    this.currentDashboard = data.currentDashboard;

  }

  ngOnInit() {
  }


  selectedWidgetEvent(selectedWidgetName: string, stepper: MatStepper) {
    this.selectedNewWidgetType = selectedWidgetName;
    stepper.next();


  }

}
