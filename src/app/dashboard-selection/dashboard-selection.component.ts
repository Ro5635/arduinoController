import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../dashboard.service";
import {UserService} from "../user.service";
import {User} from "../User";
import {Dashboard} from "../Dashboard";

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.scss']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards: [Dashboard] = [];

  constructor(private dashboardService: DashboardService, private usersService: UserService) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user: User) => {

      this.dashboardService.getDashboards(user.dashboards).subscribe((dashboards: [Dashboard]) => {
        console.log('In this call back');

        this.dashboards = dashboards;

      });

    });
  }

}
