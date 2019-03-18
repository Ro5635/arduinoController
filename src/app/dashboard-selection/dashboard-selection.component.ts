import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-selection',
  templateUrl: './dashboard-selection.component.html',
  styleUrls: ['./dashboard-selection.component.scss']
})
export class DashboardSelectionComponent implements OnInit {

  dashboards = [{name: 'Roberts', board: 'Arduino Uno'}, {name: 'Bens', board: 'Arduino Mega'}];

  constructor() { }

  ngOnInit() {
  }

}
