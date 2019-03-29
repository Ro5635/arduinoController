import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BoardBrokerServiceService} from "../../board-broker-service.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material";
import {Board} from "../../BoardClasses/Board";

@Component({
  selector: 'app-board-save',
  templateUrl: './board-save.component.html',
  styleUrls: ['./board-save.component.scss']
})
export class BoardSaveComponent implements OnInit {
  @Input() selectedBoardConfig: ConnectedBoard;
  @Output() saveCompletedEventEmitter = new EventEmitter<Board>();
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

    // Create the final board
    //TODO: Clean up, passing a provisioned boolean here when will want all the pins of that type...
    const finalBoard = new ConnectedBoard(this.selectedBoardConfig.boardBrandName, this.selectedBoardConfig.getPins(false, 'DIGITAL'), this.selectedBoardConfig.getPins(false, 'ANALOG'), this.selectedBoardConfig.getPins(false, 'PWM'), this.selectedBoardConfig.fqbn, this.selectedBoardConfig.comPort, 'NOTIMPLEMENTEDYET');

    // TODO: Send board to backend
    // For now just add the board to the service
    try {
      await
        this.boardBrokerService.setBoard(finalBoard);

        // Emit save completed event
        this.saveCompletedEventEmitter.emit(finalBoard);
      // Take the user back to their dashboard
      // this.router.navigate(['/dashboard']);

    } catch (err) {
      console.error('failed to set board in boardBrokerService');
      this.openSnackBar('Failed to Save', 'Save Board');


    }


  }


}
