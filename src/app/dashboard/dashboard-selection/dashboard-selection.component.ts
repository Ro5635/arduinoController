import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../dashboard.service";
import {UserService} from "../../user.service";
import {User} from "../../User";
import {Dashboard} from "../../Dashboard";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogueComponent} from "../../dialogues/confirm-dialogue/confirm-dialogue.component";

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.scss']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards = [];

  // Boolean used drive loading spinner for dashboards
  isLoadingDashboards = false;

  constructor(private dashboardService: DashboardService, private usersService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog) {
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

  confirmDeleteDashboard(dashboardID): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      width: '250px',
      data: {dialogueBodyText: 'This action is permanent, are you sure you want to proceed?', dialogueTitle: 'Delete Dashboard?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.userConfirmed) {
        console.log('User confirmed request for dashboard delete');
        this.deleteDashboard(dashboardID);

      } else {
        console.log('User canceled request for dashboard deletion');
      }

    });
  }

  /**
   * deleteDashboard
   *
   * Delete a users dashboard
   * @param dashboardID   string
   */
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
