import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dashboard-creation',
  templateUrl: './dashboard-creation.component.html',
  styleUrls: ['./dashboard-creation.component.scss']
})
export class DashboardCreationComponent implements OnInit {
  dashboardName = new FormControl('');

  constructor(public dialogRef: MatDialogRef<DashboardCreationComponent>) { }

  ngOnInit() {
  }

  createDashboard(): void {

  }

  close(): void {
    this.dialogRef.close();

  }

}
