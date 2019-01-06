import { Component, OnInit } from '@angular/core';
import {Board} from "../Board";
import {SessionDataServiceService} from "../session-data-service.service";

@Component({
  selector: 'app-board-selection-container',
  templateUrl: './board-selection-container.component.html',
  styleUrls: ['./board-selection-container.component.scss']
})
export class BoardSelectionContainerComponent implements OnInit {

  constructor(public sessionDataServiceService: SessionDataServiceService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    // Provide the board for the dashboard
    this.sessionDataServiceService.board = this.currentBoard;
  }

  // Create an Arduino Uno Board
  currentBoard: Board = new Board('001', 'Roberts Uno', 'Arduino Uno', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], 'COM3');
}
