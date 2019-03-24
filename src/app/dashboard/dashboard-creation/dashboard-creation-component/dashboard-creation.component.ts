import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dashboard-creation',
  templateUrl: './dashboard-creation.component.html',
  styleUrls: ['./dashboard-creation.component.scss']
})
export class DashboardCreationComponent implements OnInit {
  dashboardName = new FormControl('', [Validators.required, Validators.minLength(2)]);
  // @Output createDashboardEventEmitter = new EventEmitter<object>();

  constructor(public dialogRef: MatDialogRef<DashboardCreationComponent>) { }

  ngOnInit() {
  }

  emitCreateDashboard(): void {
    // this.createDashboardEventEmitter.emit({name: "Robert Says Hello!"});
    this.dialogRef.close({createNewDashboard: true, dashboardName: this.dashboardName.value});

  }

  close(): void {
    this.dialogRef.close({createNewDashboard: false});

  }

}
