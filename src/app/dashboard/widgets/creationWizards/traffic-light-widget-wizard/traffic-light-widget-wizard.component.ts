import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-traffic-light-widget-wizard',
  templateUrl: './traffic-light-widget-wizard.component.html',
  styleUrls: ['./traffic-light-widget-wizard.component.scss']
})
export class TrafficLightWidgetWizardComponent implements OnInit {
  @Input() currentBoard: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  @Output() newWidgetEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  trafficLightCreationForm: FormGroup;

  logicExpressions = [{viewValue: '<', value: 'lessThan'}, {viewValue: '>', value: 'greaterThan'}];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.trafficLightCreationForm = this._formBuilder.group({
      trafficLightWidgetName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      selectedConstantValue: new FormControl('', [Validators.required]),
      selectedLogicExpression: new FormControl('', [Validators.required])
    })
  }

  createTrafficLightWidget(){

  }

}
