import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {MatStepper} from "@angular/material";

@Component({
  selector: 'app-select-widget-type',
  templateUrl: './select-widget-type.component.html',
  styleUrls: ['./select-widget-type.component.scss']
})
export class SelectWidgetTypeComponent implements OnInit {
  @Input() widgets: Widget[];
  @Output() selectWidgetTypeEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitSelectedWidget(selectedWidgetName) {
    this.selectWidgetTypeEventEmitter.emit(selectedWidgetName);

  }

}
