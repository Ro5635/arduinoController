import {Component, Inject} from '@angular/core';
import {Board} from "./Board";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }

  // Create an Arduino Uno Board
  currentBoard: Board = new Board('001', 'Roberts Uno', 'Arduino Uno', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], 'COM3');
}
