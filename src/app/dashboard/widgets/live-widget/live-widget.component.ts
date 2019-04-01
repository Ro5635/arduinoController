import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {BoardBrokerServiceService} from "../../../board-broker-service.service";

@Component({
  selector: 'app-live-widget',
  templateUrl: './live-widget.component.html',
  styleUrls: ['./live-widget.component.scss']
})
export class LiveWidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  displayValue = 'Waiting For Data';

  constructor(private boardBrokerService: BoardBrokerServiceService, private zone: NgZone) {
  }

  ngOnInit() {
    this.boardBrokerService.subscribeToMicroControllerReadOnInterval(this.widget.id, this.widget.state['pinTarget'], 2).subscribe(readResponse => {
      this.zone.run(() => {
        this.widget.state['currentValue'] = readResponse['analogRead']['value'];

        this.displayValue = readResponse['analogRead']['value'];

      });


    }, err => {
      console.error('Read subscription to micro-controller produced an error');
      console.error(err);
    })
  }

}
