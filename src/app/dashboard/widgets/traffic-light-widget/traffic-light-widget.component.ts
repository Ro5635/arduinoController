import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {Subscription} from "rxjs";
import {BoardBrokerServiceService} from "../../../board-broker-service.service";
import {WidgetUpdate} from "../../../WidgetUpdate";
import {LiveDashboardService} from "../../../live-dashboard.service";

@Component({
  selector: 'app-traffic-light-widget',
  templateUrl: './traffic-light-widget.component.html',
  styleUrls: ['./traffic-light-widget.component.scss']
})
export class TrafficLightWidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();
  widgetPeerUpdateSubscription: Subscription;
  lightActivated: boolean;

  constructor(private boardBrokerService: BoardBrokerServiceService, private zone: NgZone, private liveDashboardService: LiveDashboardService) {
  }

  ngOnInit() {

    // // Subscribe to updates for this widget
    this.widgetPeerUpdateSubscription = this.liveDashboardService.getUpdatesForWidget(this.widget.id).subscribe((widgetUpdate: WidgetUpdate) => {
      this.zone.run(() => {
      // console.log(`Update to widget ${this.widget.id} received`);
        this.widget = widgetUpdate.widget;

        // Run traffic light logic
        this.runTrafficLightLogic();

      });
    }, err => {
      console.error(`Failure in subscription to widget updates for widget ID: ${this.widget.id}`);
      console.error(err);

    });

    // Subscribe to read event on micro-controller
    this.boardBrokerService.subscribeToMicroControllerReadOnInterval(this.widget.id, this.widget.state['pinTarget'], 2).subscribe(readResponse => {
      this.zone.run(() => {
        this.widget.state['currentValue'] = readResponse['analogRead']['value'];

        // Traffic light logic
        this.runTrafficLightLogic();

        // This event should be shared with peers
        this.widgetUpdate.emit(this.widget);


      });


    }, err => {
      console.error('Read subscription to micro-controller produced an error');
      console.error(err);
    });

  }

  ngOnDestroy() {
    // If there is a subscription remove it
    if (this.widgetPeerUpdateSubscription) {
      try {
        this.widgetPeerUpdateSubscription.unsubscribe();

      } catch (err) {
        console.error('Failed to remove subscription to peers updates');
        console.error(err);

      }
    }
  }

  /**
   * runTrafficLightLogic
   *
   * Logic to update the state of the component as per traffic light expression
   */
  runTrafficLightLogic(){
    switch (this.widget.state['logicExpressionName']) {
      case 'greaterThan':
        this.lightActivated = this.widget.state['currentValue'] > this.widget.state['comparisonConstant'];
        break;

      case 'lessThan':
        this.lightActivated = this.widget.state['currentValue'] < this.widget.state['comparisonConstant'];
        break;

      default:
        console.error('Unable to decode the logic expression');
        console.error(`Passed logicExpressionName: ${this.widget.state['logicExpressionName']}`);
        this.lightActivated = undefined;
    }

  }

}
