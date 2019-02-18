import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlConfiguration} from "../controlConfiguration";
import {BoardRequest} from "../boardRequest";

@Component({
  selector: 'app-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent implements OnInit {
  @Input() controlConfiguration: ControlConfiguration;
  @Output() boardRequest = new EventEmitter<BoardRequest>();

  constructor() { }

  ngOnInit() {
  }

  makeBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

}
