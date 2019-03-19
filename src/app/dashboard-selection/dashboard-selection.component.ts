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

  dashboards = [];

  // Boolean used drive loading spinner for dashboards
  isLoadingDashboards = false;

  constructor(private dashboardService: DashboardService, private usersService: UserService) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user: User) => {
      this.isLoadingDashboards = true;

      this.dashboardService.getDashboards(user.dashboards).subscribe((dashboards: [Dashboard]) => {
        this.isLoadingDashboards = false;

        this.dashboards = dashboards;

      });

    });
  }

}
