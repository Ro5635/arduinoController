import {Component, Input, OnInit} from '@angular/core';
import {ConnectedBoard} from "../ConnectedBoard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserBoard} from "../UserBoard";
import {BoardBrokerServiceService} from "../board-broker-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-board-save',
  templateUrl: './board-save.component.html',
  styleUrls: ['./board-save.component.scss']
})
export class BoardSaveComponent implements OnInit {
  @Input() selectedBoardConfig: ConnectedBoard;
  additionalBoardDetails: FormGroup;

  constructor(private _formBuilder: FormBuilder, private boardBrokerService: BoardBrokerServiceService, public router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.additionalBoardDetails = this._formBuilder.group({
      boardName: new FormControl('', [Validators.required]),
    });
  }

  openSnackBar(message: string, action: string, duration: number = 2500) {
    this.snackBar.open(message, action, {
      "duration": duration
    });
  }

  async saveBoard() {
    // Board ID currently fixed until service is written
    const FIXED_BOARD_ID_TMP = 'A001';

    // Create the final board
    const finalBoard = new UserBoard(FIXED_BOARD_ID_TMP, this.additionalBoardDetails.value.boardName, this.selectedBoardConfig.boardBrandName, this.selectedBoardConfig.digitalPins, this.selectedBoardConfig.analogPins, this.selectedBoardConfig.pwmPins, this.selectedBoardConfig.fqbn, this.selectedBoardConfig.comPort);

    // TODO: Send board to backend
    // For now just add the board to the service
    try {
      await
        this.boardBrokerService.setBoard(finalBoard);

      // Take the user back to their dashboard
      this.router.navigate(['/dashboard']);

    } catch (err) {
      console.error('failed to set board in boardBrokerService');
      this.openSnackBar('Failed to Save', 'Save Board');


    }


  }


}
