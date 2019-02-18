import { Component, OnInit } from '@angular/core';
import {ConnectedBoard} from "../ConnectedBoard";

@Component({
  selector: 'app-board-configurator',
  templateUrl: './board-configurator.component.html',
  styleUrls: ['./board-configurator.component.scss']
})
export class BoardConfiguratorComponent implements OnInit {
  selectedBoardConfig: ConnectedBoard;

  constructor() { }

  ngOnInit() {
  }

  updateSelectedBoard($selectedBoard){
    this.selectedBoardConfig = $selectedBoard;

  }

}
