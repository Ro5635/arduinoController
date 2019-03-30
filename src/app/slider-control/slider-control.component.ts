import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardRequest} from "../BoardClasses/boardRequest";
import {Widget} from "../Widget";

@Component({
  selector: 'app-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  constructor() { }

  ngOnInit() {
  }

  makeBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

}
