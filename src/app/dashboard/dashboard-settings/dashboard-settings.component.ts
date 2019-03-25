import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Dashboard} from "../../Dashboard";
import {DashboardService} from "../../dashboard.service";

import {MatSnackBar} from "@angular/material";
import {Board} from "../../BoardClasses/Board";

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit {
  dashboardID: string;
  currentDashboard: Dashboard;
  currentBoard: Board;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // Get dashboardID from route params
    this.dashboardID = this.route.snapshot.params.dashboardID;

    // Update the dashboard details
    this.updateActiveDashboard(this.dashboardID);

  }


  /**
   * updateActiveDashboard
   *
   * Gets and sets the current active dashboard using the passed dashboardID
   *
   * @param dashboardID string
   */
  private updateActiveDashboard(dashboardID): void {
    this.dashboardService.getDashboards([this.dashboardID]).subscribe((dashboardsArray: Dashboard[]) => {
      // Only a single dashboard was requested, this will be in index 0
      if (dashboardsArray[0]) {
        this.currentDashboard = dashboardsArray[0];

      } else {
        console.error(`Failed to acquire dashboard with ID: ${dashboardID}`);
      }

    })
  }

}
