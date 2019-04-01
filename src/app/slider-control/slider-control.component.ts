import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BoardRequest} from "../BoardClasses/boardRequest";
import {Widget} from "../Widget";
import {WidgetUpdate} from "../WidgetUpdate";
import {LiveDashboardService} from "../live-dashboard.service";

@Component({
  selector: 'app-slider-control',
  templateUrl: './slider-control.component.html',
  styleUrls: ['./slider-control.component.scss']
})
export class SliderControlComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();

  constructor(private liveDashboardService: LiveDashboardService) { }

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

  makeBoardRequest(payload: BoardRequest) {
    this.boardRequest.emit(payload);
  }

  handleSliderUpdate($event) {
    this.widgetUpdate.emit(this.widget);
    this.makeBoardRequest({controlType: this.widget.type, boardPin: this.widget.boardPin, newState: $event.value})

  }

}
