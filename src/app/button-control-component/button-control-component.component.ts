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

  constructor() {}

  ngOnInit() {

  }

  handleUserRequest(payload: BoardRequest) {

    // Update the widgets state
    let currentState = false;
    if (payload.newState === 1) {
      currentState = true;
    }

    this.widget.state = {pinState: currentState};

    // Emit the boardRequest
    this.boardRequest.emit(payload);
  }


}
