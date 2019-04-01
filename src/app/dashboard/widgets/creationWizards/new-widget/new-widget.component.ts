import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatStepper} from "@angular/material";
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";
import {Widget} from "../../../../Widget";
import {DashboardService} from "../../../../dashboard.service";
import {DashboardUpdateInput} from "../../../../DashboardUpdateInput";

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.scss']
})
export class NewWidgetComponent implements OnInit {
  selectedNewWidgetType;
  currentBoard: ConnectedBoard;
  currentDashboard: Dashboard;
  widgets = [{name: "Button"}, {name: "Slider"}, {name: "Traffic Light"}, {name: "Graph"}, {name: 'Live Widget'}];

  constructor(public dialogRef: MatDialogRef<NewWidgetComponent>,  @Inject(MAT_DIALOG_DATA) public data, private dashboardService: DashboardService) {
    this.currentBoard = data.currentBoard;
    this.currentDashboard = data.currentDashboard;

  }

  ngOnInit() {
  }


  selectedWidgetEvent(selectedWidgetName: string, stepper: MatStepper) {
    this.selectedNewWidgetType = selectedWidgetName;
    stepper.next();


  }

  newWidgetEventConsumer(newWidget: Widget){

    // Add the widget to the dashboard
    this.currentDashboard.addNewWidget(newWidget);

    // Save the new widget to the backend
    let dashboardUpdate = new DashboardUpdateInput();

    dashboardUpdate.id = this.currentDashboard.getID();

    dashboardUpdate.widgets = this.currentDashboard.widgets;

    this.dashboardService.updateDashboard(dashboardUpdate).subscribe( () => {
      console.log('Service updated with new widget successfully');

    }, err => {
      console.error('Call to update dashboard with new widget failed, service not updated.');
      console.error(err);
    });

    this.dialogRef.close();


  }

}
