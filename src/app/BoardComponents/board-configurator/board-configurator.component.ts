import {Component, Input, OnInit} from '@angular/core';
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../Dashboard";
import {DashboardService} from "../../dashboard.service";
import {DashboardUpdateInput} from "../../DashboardUpdateInput";
import {Board} from "../../BoardClasses/Board";

@Component({
  selector: 'app-board-configurator',
  templateUrl: './board-configurator.component.html',
  styleUrls: ['./board-configurator.component.scss']
})
export class BoardConfiguratorComponent implements OnInit {
  selectedBoardConfig: ConnectedBoard;
  @Input() currentDashboard: Dashboard;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  updateSelectedBoard($selectedBoard){
    this.selectedBoardConfig = $selectedBoard;

    const dashboardUpdates: DashboardUpdateInput = new DashboardUpdateInput();

    dashboardUpdates.id = this.currentDashboard.getID();
    dashboardUpdates.board = this.selectedBoardConfig.getSerialised();

    // Persist the updated board to the current dashboard
    this.dashboardService.updateDashboard(dashboardUpdates).subscribe( () => {


    }, err => {
      console.error('Failed to persist board selection');
      console.error(err);

    });

  }

}
