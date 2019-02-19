import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ControlConfiguration} from "../controlConfiguration";
import {BoardRequest} from '../BoardClasses/boardRequest';

@Component({
  selector: 'app-button-control-component',
  templateUrl: './button-control-component.component.html',
  styleUrls: ['./button-control-component.component.scss']
})
export class ButtonControlComponentComponent implements OnInit {
  @Input() controlConfiguration: ControlConfiguration;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  makeBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

  constructor() {}

  ngOnInit() {
  }

}
