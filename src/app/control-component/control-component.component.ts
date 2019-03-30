import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BoardRequest} from "../BoardClasses/boardRequest";
import {Widget} from "../Widget";

// This component just passes events up from the controls to the its parent

@Component({
  selector: 'app-control-component',
  templateUrl: './control-component.component.html',
  styleUrls: ['./control-component.component.scss']
})
export class ControlComponentComponent implements OnInit {

  constructor() { }
  @Input()  widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  passBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

  ngOnInit() {
  }

}
