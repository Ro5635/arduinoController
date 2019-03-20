import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {UserService} from "../user.service";
import {User} from "../User";
import {Dashboard} from "../Dashboard";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.scss']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards = [];

  // Boolean used drive loading spinner for dashboards
  isLoadingDashboards = false;

  constructor(private dashboardService: DashboardService, private usersService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.usersService.getUser().subscribe((user: User) => {
      this.isLoadingDashboards = true;

      this.dashboardService.getDashboards(user.dashboards).subscribe((dashboards: [Dashboard]) => {
        this.isLoadingDashboards = false;

        this.dashboards = dashboards;

      });

    });
  }

  deleteDashboard(dashboardID: string) {
    this.dashboardService.deleteDashboard(dashboardID)
      .subscribe(result => {
        if (result.success) {
          // Dashboard successfully deleted

          // Notify User of success
          this.snackBar.open('Successfully deleted dashboard', 'Dashboard', {
            duration: 4000,
          });

          this.removeDashboardFromDashboardsArray(dashboardID);

        } else {

          // Notify User of failure
          this.snackBar.open('Failed to delete dashboard', 'Dashboard', {
            duration: 4000,
          });

        }

      })

  }


  /**
   * removeDashboardFromDashboardsArray
   *
   * Remove the supplied dashboardID from the dashboards array
   * 
   * @param dashboardID
   */
  private removeDashboardFromDashboardsArray(dashboardID: string) {

    this.dashboards = this.dashboards.filter((currentDashboard: Dashboard) => {

      if (currentDashboard.getID() === dashboardID) {
        // Do not want to add current dashboard to array

      } else {
        return currentDashboard;
      }

    });

  }

}
