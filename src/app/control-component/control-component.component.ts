import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ControlConfiguration} from "../controlConfiguration";
import {BoardRequest} from "../BoardClasses/boardRequest";

// This component just passes events up from the controls to the its parent

@Component({
  selector: 'app-control-component',
  templateUrl: './control-component.component.html',
  styleUrls: ['./control-component.component.scss']
})
export class ControlComponentComponent implements OnInit {

  constructor() { }
  @Input() controlConfiguration: ControlConfiguration;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  passBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

  ngOnInit() {
  }

}
