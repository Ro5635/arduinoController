import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../Dashboard";
import {DashboardService} from "../../dashboard.service";
import {DashboardUpdateInput} from "../../DashboardUpdateInput";

@Component({
  selector: 'app-board-configurator',
  templateUrl: './board-configurator.component.html',
  styleUrls: ['./board-configurator.component.scss']
})
export class BoardConfiguratorComponent implements OnInit {
  selectedBoardConfig: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  @Output() boardSetupCompleteEventEmitter = new EventEmitter();

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


  /**
   * boardConfigurationProcessCompleted
   *
   * Called when the board configuration pipeline is finished
   */
  boardConfigurationProcessCompleted(): void {
    // Emit an event on the setup complete event emitter
    this.boardSetupCompleteEventEmitter.emit(true);


  }

}
