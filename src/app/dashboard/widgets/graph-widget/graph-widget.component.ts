import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {EChartOption} from 'echarts';
import {BoardBrokerServiceService} from "../../../board-broker-service.service";
import {WidgetUpdate} from "../../../WidgetUpdate";
import {LiveDashboardService} from "../../../live-dashboard.service";

/**
 *  The design of this widget will be entirely replaced once deadline is passed
 *
 *  For now the entire array of data that is "collected" by this graph is stored
 *  in an array in the widgets state. This will later be replaced with a persistent
 *  service.
 */


@Component({
  selector: 'app-graph-widget',
  templateUrl: './graph-widget.component.html',
  styleUrls: ['./graph-widget.component.scss']
})
export class GraphWidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();
  chartOption: EChartOption;
  updateOptions: EChartOption;

  constructor(private boardBrokerService: BoardBrokerServiceService, private zone: NgZone, private liveDashboardService: LiveDashboardService) {
  }

  ngOnInit() {

    this.chartOption = {
      legend: {
        data: ['bar'],
        align: 'left'
      },
      tooltip: {},
      xAxis: {
        data: this.widget.state['xAxisData'],
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {},
      series: [{
        name: `${this.widget.name} Readings`,
        type: this.widget.state['chartType'],
        data: this.widget.state['readResult'],
        animationDelay: function (idx) {
          return idx * 10;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };

    this.updateOptions = {
      xAxis: {
        data: this.widget.state['xAxisData']
      },
      series: [{
        data: this.widget.state['readResult'],
      }]
    };


    // // Subscribe to updates for this widget
    this.liveDashboardService.getUpdatesForWidget(this.widget.id).subscribe((widgetUpdate: WidgetUpdate) => {
      // this.zone.run(() => {
      console.log(`Update to graph widget ${this.widget.id} received`);

      this.widget.state = widgetUpdate.widget.state;

      // Update the chart
      this.updateOptions = {
        xAxis: {
          data: this.widget.state['xAxisData']
        },
        series: [{
          data: this.widget.state['readResult'],
        }]
      };


      // });

    }, err => {
      console.error(`Failure in subscription to widget updates for widget ID: ${this.widget.id}`);
      console.error(err);

    });


    this.boardBrokerService.subscribeToMicroControllerReadOnInterval(this.widget.id, this.widget.state['pinTarget'], 2).subscribe(readResponse => {
      this.zone.run(() => {
        const newValue = readResponse['analogRead']['value'];

        const now = new Date();
        const stringNow = `${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}`;

        this.widget.state['xAxisData'].push(stringNow);
        this.widget.state['readResult'].push(newValue);

        // If the data array already has 25 items in it shift the oldest out
        if (this.widget.state['readResult'].length > this.widget.state['dataLength']) {
          this.widget.state['readResult'].shift();
          this.widget.state['xAxisData'].shift();

        }

        // update the chart
        this.updateOptions = {
          xAxis: {
            data: this.widget.state['xAxisData']
          },
          series: [{
            data: this.widget.state['readResult'],
          }]
        };


        // This event should be shared with peers
        this.widgetUpdate.emit(this.widget);


      });


    }, err => {
      console.error('Read subscription to micro-controller produced an error');
      console.error(err);
    });


  }

  /**
   * downloadCSVExport
   *
   */
  downloadCSVExport(): void {
    const csvStartContent = "data:text/csv;charset=utf-8,";

    let csvRows = [];

    for (let index = 0; index < this.widget.state['readResult'].length; index++) {
      csvRows.push(`${this.widget.state['xAxisData'][index]},${this.widget.state['readResult'][index]}`);

    }

    // Join the CSV rows together
    const csvContent = csvStartContent + csvRows.join("\n");


    // Encode into a URI that can be opened as a link
    const encodedUri = encodeURI(csvContent);
    window.open(encodedUri);

  }


}
