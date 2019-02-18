import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Board} from "../Board";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardBrokerServiceService} from "../board-broker-service.service";
import {ArduinoCLIBoard} from "../ArduinoCLIBoard";
import {ConnectedBoard} from "../ConnectedBoard";

@Component({
  selector: 'app-board-selection-container',
  templateUrl: './board-selection-container.component.html',
  styleUrls: ['./board-selection-container.component.scss']
})
export class BoardSelectionContainerComponent implements OnInit {
  @Output() selectedBoardEmitter = new EventEmitter<ConnectedBoard>();

  // Create each supported board
  arduinoUno: Board = new Board('Arduino Uno', ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'], ['3','5', '6', '9', '10', '11'], 'arduino:avr:uno');
  arduinoMega: Board = new Board('Arduino Mega', ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53'], ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15'], ['3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13'], 'arduino:avr:mega');

  supportedBoardDetails: object = {};

  connectedBoards: ConnectedBoard[] = [];
  loadingBoards: boolean = false;

  boardSelectionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private boardBrokerService: BoardBrokerServiceService) {
  }

  ngOnInit() {
    this.boardSelectionForm = this._formBuilder.group({
      selectedBoard: new FormControl('', [Validators.required])
    });

    this.supportedBoardDetails[this.arduinoUno.fqbn] = this.arduinoUno;
    this.supportedBoardDetails[this.arduinoMega.fqbn] = this.arduinoMega;

  }

  // TODO: Handle failure of the board scan
  async getConnectedBoards() {

    // Clear previously found boards
    this.connectedBoards = [];

    console.log("Requesting board scan");
    this.loadingBoards = true;
    const rawConnectedBoards: ArduinoCLIBoard[] = await this.boardBrokerService.getConnectedBoards();

    // Transform the response into an array of ConnectedBoards
    for (let rawConnectedBoard of rawConnectedBoards) {

      // Get the supporting board details using the fqbn
      const boardDetails: Board = this.supportedBoardDetails[rawConnectedBoard.fqbn];

      // Create the new Board
      const newBoard: ConnectedBoard = new ConnectedBoard(rawConnectedBoard.name, boardDetails.digitalPins, boardDetails.analogPins, boardDetails.pwmPins, rawConnectedBoard.fqbn, rawConnectedBoard.port, rawConnectedBoard.usbID);

      this.connectedBoards.push(newBoard);

    }

    this.loadingBoards = false;

  }

  emitBoardSelection(): void {
    // Emit the  users selection details to parent
    const selectedBoardType: Board = this.boardSelectionForm.value.board;
    const selectedBoard: ConnectedBoard = this.boardSelectionForm.value.selectedBoard;

    this.selectedBoardEmitter.emit(selectedBoard);

  };


}
