import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Widget} from "../../../../Widget";
import {PIN_STATES} from "../../../../BoardClasses/PIN_STATES_ENUM";
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {Dashboard} from "../../../../Dashboard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-slider-widget-wizard',
  templateUrl: './slider-widget-wizard.component.html',
  styleUrls: ['./slider-widget-wizard.component.scss']
})
export class SliderWidgetWizardComponent implements OnInit {
  @Input() currentBoard: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  @Output() newWidgetEventEmitter: EventEmitter = new EventEmitter();
  sliderCreationForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.sliderCreationForm = this._formBuilder.group({
      sliderName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required])
    })
  }

  createSliderWidget(selectedPin: string, buttonName: string){
    // TODO: Handle ID Collisions
    const newWidget = new Widget('Slider', buttonName, uuid(), {value: 0}, selectedPin);

    // Set the pin as provisioned
    this.currentBoard.provisionPin(selectedPin, PIN_STATES.OUTPUT);

    // Emit the new Widget for generic new Widget processes
    this.newWidgetEventEmitter.emit(newWidget);

  }

}
