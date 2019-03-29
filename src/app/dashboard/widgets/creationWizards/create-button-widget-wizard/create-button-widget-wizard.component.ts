import {Component, Input, OnInit} from '@angular/core';
import {ConnectedBoard} from "../../../../BoardClasses/ConnectedBoard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PIN_STATES} from "../../../../BoardClasses/PIN_STATES_ENUM";
import {Dashboard} from "../../../../Dashboard";
import {Widget} from "../../../../Widget";

@Component({
  selector: 'app-create-button-widget-wizard',
  templateUrl: './create-button-widget-wizard.component.html',
  styleUrls: ['./create-button-widget-wizard.component.scss']
})
export class CreateButtonWidgetWizardComponent implements OnInit {
  @Input() currentBoard: ConnectedBoard;
  @Input() currentDashboard: Dashboard;
  buttonCreationForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buttonCreationForm = this._formBuilder.group({
      buttName: new FormControl('', [Validators.required]),
      pin: new FormControl('', [Validators.required])
    })
  }

  createButtonWidget(selectedPin: string, buttonName: string){
    const newWidget = new Widget('button', buttonName, 'NOTIMPLEMENTED', {},selectedPin);

    // Set the pin as provisioned
    this.currentBoard.provisionPin(selectedPin, PIN_STATES.OUTPUT);

    // Add the widget to the dashboard
    this.currentDashboard.addNewWidget(newWidget);


    // Update the backend service

  }

}
