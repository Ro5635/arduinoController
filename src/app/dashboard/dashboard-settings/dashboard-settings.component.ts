import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-settings',
  templateUrl: './dashboard-settings.component.html',
  styleUrls: ['./dashboard-settings.component.scss']
})
export class DashboardSettingsComponent implements OnInit {
  dashboardID: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dashboardID = this.route.snapshot.params.dashboardID;
  }

}
