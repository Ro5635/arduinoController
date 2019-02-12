import { Component, OnInit } from '@angular/core';
import {ConnectedBorad} from "../ConnectedBorad";

@Component({
  selector: 'app-board-configurator',
  templateUrl: './board-configurator.component.html',
  styleUrls: ['./board-configurator.component.scss']
})
export class BoardConfiguratorComponent implements OnInit {
  selectedBoradConfig: ConnectedBorad;

  constructor() { }

  ngOnInit() {
  }

  updateSelectedBoard($selectedBoard){
    this.selectedBoradConfig = $selectedBoard;

  }

}
