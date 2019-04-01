import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Widget} from "../../../Widget";
import {BoardRequest} from "../../../BoardClasses/boardRequest";
import {EChartOption} from 'echarts';

@Component({
  selector: 'app-graph-widget',
  templateUrl: './graph-widget.component.html',
  styleUrls: ['./graph-widget.component.scss']
})
export class GraphWidgetComponent implements OnInit {
  @Input() widget: Widget;
  @Output() boardRequest = new EventEmitter<BoardRequest>();
  @Output() widgetUpdate = new EventEmitter<Widget>();

  constructor() {
  }

  ngOnInit() {
  }

  chartOption: EChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      animationEasing: 'elasticOut',
    }]
  }

}
