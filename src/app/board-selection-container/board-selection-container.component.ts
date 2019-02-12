import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Board} from "../Board";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardBrokerServiceService} from "../board-broker-service.service";
import {ArduinoCLIBoard} from "../ArduinoCLIBoard";
import {ConnectedBorad} from "../ConnectedBorad";

@Component({
  selector: 'app-board-selection-container',
  templateUrl: './board-selection-container.component.html',
  styleUrls: ['./board-selection-container.component.scss']
})
export class BoardSelectionContainerComponent implements OnInit {
  @Output() selectedBoard = new EventEmitter<ConnectedBorad>();

  // Create each available board
  arduinoUno: Board = new Board('Arduino Uno', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5']);

  availableBoards: Board[] = [this.arduinoUno];

  connectedArduinoBoards: ArduinoCLIBoard[] = [];
  loadingBoards: boolean = false;

  boardSelectionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private boardBrokerService: BoardBrokerServiceService) {
  }

  ngOnInit() {
    this.boardSelectionForm = this._formBuilder.group({
      board: new FormControl('', [Validators.required]),
      connectedArduinoBoard: new FormControl('', [Validators.required])
    });
  }

  // TODO: Handle failure of the board scan
  async getConnectedBoards() {
    console.log("Requesting board scan");
    this.loadingBoards = true;
    const connectedBoards: ArduinoCLIBoard[] = await this.boardBrokerService.getConnectedBoards();

    this.loadingBoards = false;
    this.connectedArduinoBoards = connectedBoards;

  }

  emitBoardSelection(): void {

  }


}
