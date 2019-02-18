import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Board} from "../Board";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardBrokerServiceService} from "../board-broker-service.service";
import {ArduinoCLIBoard} from "../ArduinoCLIBoard";
import {ConnectedBoard} from "../ConnectedBoard";
import {SupportedBoardData} from "../Config/SupportedBoardData";

@Component({
  selector: 'app-board-selection-container',
  templateUrl: './board-selection-container.component.html',
  styleUrls: ['./board-selection-container.component.scss']
})
export class BoardSelectionContainerComponent implements OnInit {
  @Output() selectedBoardEmitter = new EventEmitter<ConnectedBoard>();

  SUPPORTEDBOARDDATA = new SupportedBoardData();
  supportedBoardDetails: object = this.SUPPORTEDBOARDDATA.supportedBoards;

  connectedBoards: ConnectedBoard[] = [];
  loadingBoards: boolean = false;

  boardSelectionForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private boardBrokerService: BoardBrokerServiceService) {
  }

  ngOnInit() {
    this.boardSelectionForm = this._formBuilder.group({
      selectedBoard: new FormControl('', [Validators.required])
    });

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
