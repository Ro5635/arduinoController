import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../BoardClasses/Board";

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss']
})
export class BoardDetailsComponent implements OnInit {
  @Input() board: Board;

  constructor() { }

  ngOnInit() {
  }

}
