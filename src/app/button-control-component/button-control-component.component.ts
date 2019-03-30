import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BoardRequest} from '../BoardClasses/boardRequest';
import {Widget} from "../Widget";

@Component({
  selector: 'app-button-control-component',
  templateUrl: './button-control-component.component.html',
  styleUrls: ['./button-control-component.component.scss']
})
export class ButtonControlComponentComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  makeBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

  constructor() {}

  ngOnInit() {
  }

}
