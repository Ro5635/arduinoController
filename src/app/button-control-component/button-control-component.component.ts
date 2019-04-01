import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {BoardRequest} from '../BoardClasses/boardRequest';
import {Widget} from "../Widget";
import {LiveDashboardService} from "../live-dashboard.service";
import {WidgetUpdate} from "../WidgetUpdate";

@Component({
  selector: 'app-button-control-component',
  templateUrl: './button-control-component.component.html',
  styleUrls: ['./button-control-component.component.scss']
})
export class ButtonControlComponentComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();

  constructor(private liveDashboardService: LiveDashboardService) {}

  ngOnInit() {

    // // Subscribe to updates for this widget
    this.liveDashboardService.getUpdatesForWidget(this.widget.id).subscribe((widgetUpdate: WidgetUpdate) => {
      // console.log(`Update to widget ${this.widget.id} received`);
      this.widget = widgetUpdate.widget;
    }, err => {
      console.error(`Failure in subscription to widget updates for widget ID: ${this.widget.id}`);
      console.error(err);

    });

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

    // Update peers
    this.widgetUpdate.emit(this.widget);
  }


}
