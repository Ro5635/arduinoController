import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-widget',
  templateUrl: './new-widget.component.html',
  styleUrls: ['./new-widget.component.scss']
})
export class NewWidgetComponent implements OnInit {

  widgets = [{name: "Button"}, {name: "Slider"}, {name: "Traffic Light"}, {name: "Graph"}];

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log('Ran!')
  }

}
