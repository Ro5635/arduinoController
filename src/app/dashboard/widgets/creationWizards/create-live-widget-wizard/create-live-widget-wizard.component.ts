import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Widget} from "../../../../Widget";
import {v4 as uuid} from "uuid";
import {PIN_STATES} from "../../../../BoardClasses/PIN_STATES_ENUM";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";

@Component({
  selector: 'app-create-live-widget-wizard',
  templateUrl: './create-live-widget-wizard.component.html',
  styleUrls: ['./create-live-widget-wizard.component.scss']
})
export class CreateLiveWidgetWizardComponent implements OnInit {
  @Input() currentBoard: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  @Output() newWidgetEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  liveWidgetCreationForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.liveWidgetCreationForm = this._formBuilder.group({
      liveWidgetName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required])
    })
  }

  createLiveWidget(selectedPin: string, liveWidgetName: string){

    let pinTarget = selectedPin;

    if (selectedPin.indexOf("A") >= 0) {
      // Need to convert pin number to base 10 form
      let target = selectedPin;

      let targetNumOnly = target.replace('A', '');

      const convertedPinNum = +targetNumOnly + 54;

      console.log(`Converted pin number to: ${convertedPinNum}`);
      pinTarget = "" + convertedPinNum;

    }


    const newWidget = new Widget('LiveWidget', liveWidgetName, uuid(), {interval: 2, 'pinTarget': pinTarget, currentValue: "Waiting"}, selectedPin);

    // Set the pin as provisioned
    this.currentBoard.provisionPin(selectedPin, PIN_STATES.INPUT);

    // Emit the new Widget for generic new Widget processes
    this.newWidgetEventEmitter.emit(newWidget);

  }

}
