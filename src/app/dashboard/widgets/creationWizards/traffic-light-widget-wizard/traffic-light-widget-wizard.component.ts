import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Widget} from "../../../../Widget";
import {v4 as uuid} from "uuid";
import {PIN_STATES} from "../../../../BoardClasses/PIN_STATES_ENUM";

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
  trafficLightUpdatePeriod = 3;

  logicExpressions = [{viewValue: '>', value: 'lessThan'}, {viewValue: '<', value: 'greaterThan'}];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.trafficLightCreationForm = this._formBuilder.group({
      trafficLightWidgetName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required]),
      selectedConstantValue: new FormControl(500, [Validators.required, Validators.min(0), Validators.max(1023), Validators.pattern('[0-9]*')]),
      selectedLogicExpression: new FormControl('', [Validators.required])
    })
  }

  createTrafficLightWidget(trafficLightName: string, pin: string, selectedConstant: number, selectedLogicExpressionName: string) {
    let pinTarget = pin;

    if (pin.indexOf("A") >= 0) {
      // Need to convert pin number to base 10 form
      let target = pin;

      let targetNumOnly = target.replace('A', '');

      const convertedPinNum = +targetNumOnly + 54;

      console.log(`Converted pin number to: ${convertedPinNum}`);
      pinTarget = "" + convertedPinNum;

    }

    const newWidget = new Widget('TrafficLight', trafficLightName, uuid(), {'interval': this.trafficLightUpdatePeriod, 'pinTarget': pinTarget, 'currentValue': -1, 'comparisonConstant': selectedConstant, 'logicExpressionName': selectedLogicExpressionName}, pin);

    // Set the pin as provisioned
    this.currentBoard.provisionPin(pin, PIN_STATES.INPUT);

    // Emit the new Widget for generic new Widget processes
    this.newWidgetEventEmitter.emit(newWidget);
  }

}
