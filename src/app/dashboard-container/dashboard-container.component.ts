import {Component, OnInit} from '@angular/core';
import {SessionDataServiceService} from "../session-data-service.service";
import {Board} from "../BoardClasses/Board";

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  constructor(public sessionDataServiceService: SessionDataServiceService) {
  }

  currentBoard: Board;

  ngOnInit() {
    this.currentBoard = this.sessionDataServiceService.board;
  }

}
