import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Widget} from "../../../../Widget";
import {v4 as uuid} from "uuid";
import {PIN_STATES} from "../../../../BoardClasses/PIN_STATES_ENUM";

@Component({
  selector: 'app-graph-widget-wizard',
  templateUrl: './graph-widget-wizard.component.html',
  styleUrls: ['./graph-widget-wizard.component.scss']
})
export class GraphWidgetWizardComponent implements OnInit {
  @Input() currentBoard: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  @Output() newWidgetEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  graphCreationForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }


  ngOnInit() {
    this.graphCreationForm = this._formBuilder.group({
      graphName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required])
    })
  }

  createGraphWidget(selectedPin: string, graphName: string){

    let pinTarget = selectedPin;

    if (selectedPin.indexOf("A") >= 0) {
      // Need to convert pin number to base 10 form
      let target = selectedPin;

      let targetNumOnly = target.replace('A', '');

      const convertedPinNum = +targetNumOnly + 54;

      console.log(`Converted pin number to: ${convertedPinNum}`);
      pinTarget = "" + convertedPinNum;

    }

    // TODO: Handle ID Collisions
    const newWidget = new Widget('Graph', graphName, uuid(), {'interval': 2, 'pinTarget': pinTarget, 'xAxisData': [], 'readResult': [], chartType: "bar", 'dataLength':25}, selectedPin);

    // Set the pin as provisioned
    this.currentBoard.provisionPin(selectedPin, PIN_STATES.INPUT);

    // Emit the new Widget for generic new Widget processes
    this.newWidgetEventEmitter.emit(newWidget);

  }

}
