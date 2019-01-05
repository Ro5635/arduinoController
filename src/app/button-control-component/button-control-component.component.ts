import { Component, OnInit, Input } from '@angular/core';
import {ControlConfiguration} from "../controlConfiguration";

@Component({
  selector: 'app-button-control-component',
  templateUrl: './button-control-component.component.html',
  styleUrls: ['./button-control-component.component.scss']
})
export class ButtonControlComponentComponent implements OnInit {
  @Input() controlConfiguration: ControlConfiguration;

  constructor() { }

  ngOnInit() {
  }

}
