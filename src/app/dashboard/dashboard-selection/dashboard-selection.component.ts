import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../dashboard.service";
import {UserService} from "../../user.service";
import {User} from "../../User";
import {Dashboard} from "../../Dashboard";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogueComponent} from "../../dialogues/confirm-dialogue/confirm-dialogue.component";
import {DashboardCreationComponent} from "../dashboard-creation/dashboard-creation-component/dashboard-creation.component";
import {Observable} from "rxjs";
import {DashboardUpdateInput} from "../../DashboardUpdateInput";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.scss']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards = [];

  // Boolean used drive loading spinner for dashboards
  isLoadingDashboards = false;

  constructor(private dashboardService: DashboardService, private usersService: UserService, private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {

    this.isLoadingDashboards = true;

    this.usersService.getUser().subscribe((user: User) => {

      this.dashboardService.getDashboards(user.dashboards).subscribe((dashboards: [Dashboard]) => {
        this.isLoadingDashboards = false;

        this.dashboards = dashboards;

      });

    });
  }


  createDashboardDialogue(): void {
    const dialogRef = this.dialog.open(DashboardCreationComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(userResponse => {
      if (userResponse.createNewDashboard) {
        console.log('User requested creation of a new dashboard');

        this.createDashboard(userResponse.dashboardName).subscribe( (newDashboardID: string) => {
          // Take the user to the new dashboards settings page
          this.router.navigate(['/dashboard/settings', newDashboardID]);

        });

      }
    });
  }

  /**
   * createDashboard
   *
   * Call the backend API's required to register a new dashboard to a user
   * and then update it's name and then navigate the user to edit that dashboard
   *
   * If no dashboardName is supplied then dashboard creation will only require a single service call
   * and likely much faster
   *
   * Due to the fragmentation of the services this cannot be completed in a single call.
   *
   * @param dashboardName string  optional string name for new dashboard
   */
  private createDashboard(dashboardName: string): Observable<string> {
    return new Observable(observer => {

      // Show a snackbar notification of successful dashboard creation
      this.snackBar.open('Successfully created new dashboard', 'Dashboard', {
        duration: 4000,
      });

      this.usersService.registerNewDashboard().subscribe((newDashboardID: string) => {

        if (!dashboardName) {
          // No name supplied, dashboard creation process finished for this call
          observer.next(newDashboardID);
          return observer.complete();

        }

        // Crate the dashboard updates object for updating the name on the new dashboard
        const dashboardUpdates: DashboardUpdateInput = new DashboardUpdateInput();

        dashboardUpdates['id'] = newDashboardID;
        dashboardUpdates['name'] = dashboardName;

        // Need to get an updated auth token with this new dashboardID in the grants
        this.usersService.refreshToken().subscribe(() => {

          // Call the dashboard_service and set the name of the new dashboard
          this.dashboardService.updateDashboard(dashboardUpdates).subscribe(result => {

            observer.next(newDashboardID);
            return observer.complete();

          });

        });
      })// So many brackets  :(
    });
  }


  /**
   * confirmDeleteDashboard
   *
   * Ask the user for confirmation that they wish to delete a dashboard, on their confirmation
   * call the deletion of the dashboard.
   *
   * @param dashboardID strings
   */
  confirmDeleteDashboard(dashboardID): void {
    const dialogRef = this.dialog.open(ConfirmDialogueComponent, {
      width: '250px',
      data: {
        dialogueBodyText: 'This action is permanent, are you sure you want to proceed?',
        dialogueTitle: 'Delete Dashboard?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.userConfirmed) {
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
