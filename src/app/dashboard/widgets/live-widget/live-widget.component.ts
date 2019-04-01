import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {BoardBrokerServiceService} from "../../../board-broker-service.service";
import {LiveDashboardService} from "../../../live-dashboard.service";

@Component({
  selector: 'app-live-widget',
  templateUrl: './live-widget.component.html',
  styleUrls: ['./live-widget.component.scss']
})
export class LiveWidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();

  constructor(private boardBrokerService: BoardBrokerServiceService, private zone: NgZone, private liveDashboardService: LiveDashboardService) {
  }

  ngOnInit() {
    this.boardBrokerService.subscribeToMicroControllerReadOnInterval(this.widget.id, this.widget.state['pinTarget'], 2).subscribe(readResponse => {
      this.zone.run(() => {
        this.widget.state['currentValue'] = readResponse['analogRead']['value'];

        // This event should be shared with peers
        this.widgetUpdate.emit(this.widget);


      });


    }, err => {
      console.error('Read subscription to micro-controller produced an error');
      console.error(err);
    });

    // // Subscribe to updates for this widget
    // this.liveDashboardService.getUpdatesForWidget(this.widget.id).subscribe((widgetUpdate: Widget) => {
    //   console.log(`Update to widget ${this.widget.id} received`);
    //   this.widget = widgetUpdate;
    // }, err => {
    //   console.error(`Failure in subscription to widget updates for widget ID: ${this.widget.id}`);
    //   console.error(err);
    //
    // })
  }




}
