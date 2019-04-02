import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {EChartOption} from 'echarts';
import {BoardBrokerServiceService} from "../../../board-broker-service.service";
import {WidgetUpdate} from "../../../WidgetUpdate";
import {LiveDashboardService} from "../../../live-dashboard.service";
import {BoardConfiguratorDialogueWrapperComponent} from "../../../BoardComponents/board-configurator-dialogue-wrapper/board-configurator-dialogue-wrapper.component";
import {MatDialog} from "@angular/material";
import {GraphWidgetSettingsComponent} from "../graph-widget-settings/graph-widget-settings.component";
import {Subscription} from "rxjs";

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
  private microControllerReadSubscription: Subscription;

  constructor(private boardBrokerService: BoardBrokerServiceService, private zone: NgZone, private liveDashboardService: LiveDashboardService, public dialog: MatDialog,) {
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
        type: this.widget.state['chartType'],
        data: this.widget.state['readResult'],
      }]
    };


    // // Subscribe to updates for this widget
    this.liveDashboardService.getUpdatesForWidget(this.widget.id).subscribe((widgetUpdate: WidgetUpdate) => {
      this.zone.run(() => {
      console.log(`Update to graph widget ${this.widget.id} received`);

      this.widget.state = widgetUpdate.widget.state;

      // Update the chart
      this.updateOptions = {
        xAxis: {
          data: this.widget.state['xAxisData']
        },
        series: [{
          data: this.widget.state['readResult'],
          type: this.widget.state['chartType'],
        }]
      };


      });

    }, err => {
      console.error(`Failure in subscription to widget updates for widget ID: ${this.widget.id}`);
      console.error(err);

    });

    this.setUpMicroControllerReadSubscription();


  }

  ngOnDestroy() {

    // Remove the micro-controller read subscription
    try {
      this.microControllerReadSubscription.unsubscribe();

    } catch (err) {
      console.log('There was no micro-controller subscription to close');
      console.log(err);
    }

  }

  setUpMicroControllerReadSubscription () {

    this.microControllerReadSubscription = this.boardBrokerService.subscribeToMicroControllerReadOnInterval(this.widget.id, this.widget.state['pinTarget'], this.widget.state['interval']).subscribe(readResponse => {
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

          if (this.widget.state['xAxisData'].length > this.widget.state['dataLength']) {
            // Shift did not reduce to correct size, must have switched graph to a smaller size
            // Extract the required length from the arrays
            console.log('At start');
            console.log(this.widget.state['readResult'] );
            const newStartIndex = this.widget.state['xAxisData'].length - this.widget.state['dataLength'];
            this.widget.state['xAxisData'] = this.widget.state['xAxisData'].splice(newStartIndex, this.widget.state['xAxisData'].length);
            this.widget.state['readResult'] = this.widget.state['readResult'].splice(newStartIndex, this.widget.state['readResult'].length);
            console.log('Shifted!');
            console.log(this.widget.state['readResult'] );
          }

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



  }  /**
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

  openGraphWidgetSettings() {
    const dialogRef = this.dialog.open(GraphWidgetSettingsComponent, {
      width: '750px',
      data: {widget: this.widget}
    });

    dialogRef.afterClosed().subscribe(() => {
      // update the chart
      this.updateOptions = {
        xAxis: {
          data: this.widget.state['xAxisData']
        },
        series: [{
          name: `${this.widget.name} Readings`,
          type: this.widget.state['chartType'],
          data: this.widget.state['readResult'],
          animationDelay: function (idx) {
            return idx * 10;
          }}]
      };


      // Update the widget Subscription
      try {
        this.microControllerReadSubscription.unsubscribe();
        this.setUpMicroControllerReadSubscription();

      } catch (err) {
        console.log('Could not unsubscribe from micro-controller subscription');
        console.log(err);
      }

      // This event should be shared with peers
      this.widgetUpdate.emit(this.widget);


    });


  }


}
