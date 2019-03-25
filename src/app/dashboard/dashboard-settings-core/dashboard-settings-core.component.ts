import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from "../../Dashboard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DashboardUpdateInput} from "../../DashboardUpdateInput";
import {DashboardService} from "../../dashboard.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-dashboard-settings-core',
  templateUrl: './dashboard-settings-core.component.html',
  styleUrls: ['./dashboard-settings-core.component.scss']
})
export class DashboardSettingsCoreComponent implements OnInit {
  @Input() currentDashboard: Dashboard;
  dashboardDetailsForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private dashboardService: DashboardService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // Init the form
    this.dashboardDetailsForm = this._formBuilder.group({
      // TODO: Handle this.currentDashboard being undefined...
      name: new FormControl(this.currentDashboard.getName(), [Validators.required, Validators.minLength(2)])
    });

  }

  /**
   * saveDashboardDetails
   *
   * Saves changes made to dashboard details on the dashboardDetailsForm
   */
  private saveDashboardDetails() {
    let dashboardUpdates: DashboardUpdateInput = new DashboardUpdateInput();

    dashboardUpdates['id'] = this.currentDashboard.getID();

    for (let controlName in this.dashboardDetailsForm.controls) {
      // Get the current control
      let control = this.dashboardDetailsForm.get(controlName);

      // Ony add control to the update if it is changed
      if (control.dirty) {
        dashboardUpdates[controlName] = control.value;

      }
    }

    // Call for updates to be made:
    this.dashboardService.updateDashboard(dashboardUpdates).subscribe(() => {
      // Dashboard Updated successfully
      this.snackBar.open('Updates Saved Successfully', 'Dashboard', {
        duration: 4000,
      });

      for (let controlName in this.dashboardDetailsForm.controls) {
        // Get the current control
        let control = this.dashboardDetailsForm.get(controlName);

        // Update the local currentDashboard state with the changes persisted to the backend
        if (control.dirty) {
          this.currentDashboard[controlName] = control.value;

        }
      }


    }, err => {
      console.error('Failed to save dashboard updates');
      console.error(err);

      this.snackBar.open('Failed To Save Changes', 'Dashboard', {
        duration: 4000,
      });

    });

  }



}
