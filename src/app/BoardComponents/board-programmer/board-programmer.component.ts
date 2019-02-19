import {Component, Input, OnInit} from '@angular/core';
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";
import {BoardBrokerServiceService} from "../../board-broker-service.service";

@Component({
  selector: 'app-board-programmer',
  templateUrl: './board-programmer.component.html',
  styleUrls: ['./board-programmer.component.scss']
})
export class BoardProgrammerComponent implements OnInit {
  @Input() selectedBoardConfig: ConnectedBoard;
  programmingInProgress: boolean = false;
  programmingSuccessful: boolean = false;


  constructor(private boardBrokerService: BoardBrokerServiceService) {
  }

  ngOnInit() {
  }

  async programmeBoard() {
    this.programmingInProgress = true;

    try {
      const status = await this.boardBrokerService.programmeBoard(this.selectedBoardConfig);

      if (status) {
        this.programmingInProgress = false;
        this.programmingSuccessful = true;
        

      } else {
        throw new Error('Failed to programme board');
      }

    } catch (err) {
      console.error('Failed to programme board');
      console.error(err);
    }


  }

}
