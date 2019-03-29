import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {ControlConfiguration} from '../../controlConfiguration';
import {BoardRequest} from "../../BoardClasses/boardRequest";
import {BoardBrokerServiceService} from "../../board-broker-service.service";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Dashboard} from "../../Dashboard";
import {DashboardService} from "../../dashboard.service";
import {ConnectedBoard} from "../../BoardClasses/ConnectedBoard";
import {ConfirmBoardForLoadDialogueComponent} from "../../dialogues/confirm-board-for-load-dialogue/confirm-board-for-load-dialogue.component";
import {CreateControlDialogueComponent} from "../../create-control-dialogue/create-control-dialogue.component";
import {BoardConfiguratorDialogueWrapperComponent} from "../../BoardComponents/board-configurator-dialogue-wrapper/board-configurator-dialogue-wrapper.component";
import {NewWidgetComponent} from "../widgets/creationWizards/new-widget/new-widget.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardID: string;
  currentDashboard: Dashboard;

  // Connected board is pulled out of the dashboard and stored as the ConnectedBoard type
  currentBoard: ConnectedBoard;

  constructor(public dialog: MatDialog, private boardBrokerServiceService: BoardBrokerServiceService, private route: ActivatedRoute, private dashboardService: DashboardService, private router: Router) {
  }


  ngOnInit() {
    // Get dashboardID from route params
    this.dashboardID = this.route.snapshot.params.dashboardID;

    // Load the dashboard into the view
    this.loadConfiguration(this.dashboardID).subscribe();

  }

  /**
   * ngOnDestroy
   *
   * Angular lifecycle - called on unload of the dashboard
   *
   * Closes the active serial port, this is required the serial port can be used later
   */
  ngOnDestroy() {
    this.boardBrokerServiceService.closeSerialPort().subscribe( () => {}, err => {
      console.log('Failed to shutdown dashboard cleanly');
    });
  }


  // Controls present on the dashboard
  controlsCol1: Array<ControlConfiguration> = [];
  controlsCol2: Array<ControlConfiguration> = [];

  /**
   * boardRequest
   *
   * Handle requests from the controls within this dash and pass the events on to the  boardBrokerService
   * that will handle the requested operations
   *
   * @param passedBoardRequest  BoardRequest
   */
  async boardRequest(passedBoardRequest: BoardRequest) {
    await this.boardBrokerServiceService.boardRequest(passedBoardRequest)

  }

  /**
   * loadConfiguration
   *
   * Load configuration into the dashboards state, calls the load of dashboard and micro-controller
   *
   * @param dashboardID string
   */
  private loadConfiguration(dashboardID: string): Observable<boolean> {
    return new Observable(observer => {

      // Fetch the details of the selected dashboard from the server
      this.loadDashboard(dashboardID).subscribe(() => {

        // Load the users micro-controller
        this.loadDashboardMicroController().subscribe(() => {
          observer.next();
          observer.complete();

        }, err => {
          console.error('Failed to load the micro-controller for the dashboard');
          console.error(err);

          console.log('Starting configure new Board process');
          this.configureNewBoardWizard().subscribe(() => {
            observer.next();
            observer.complete();

          }, err => {
            console.error('Failed to configure a new micro-controller board');
            console.error(err);

            return observer.error('Failed to load dashboard micro-controller');

          });

        })

      }, err => {
        console.error('Call to load dashboard failed');
        console.error(err);
        return observer.error('Failed to load configuration');

      });

    });
  }


  /**
   * loadDashboard
   *
   * Loads the dashboard from the supplied dashboardID into the state of the component
   *
   * @param dashboardID string
   */
  private loadDashboard(dashboardID: string) {
    return new Observable(observer => {

      this.dashboardService.getDashboards([dashboardID]).subscribe((dashboardsArray: [Dashboard]) => {
        this.currentDashboard = dashboardsArray[0];
        observer.next();
        return observer.complete();

      }, err => {
        console.error('Failed to load the dashboard');
        console.error(err);
        return observer.error('Failed to load the dashboard');

      })
    });
  }


  /**
   * loadDashboardMicroController
   *
   * Loads the dashboard's micro-controller into the boardBroker service, if there is no board defined for this
   * dashboard then this will throw an error.
   */
  private loadDashboardMicroController() {
    return new Observable(observer => {

      if (this.currentDashboard.getBoard()) {
        this.currentBoard = this.currentDashboard.getBoard();


        // Have found a board, confirm with the user that they wish to load this board.
        const dialogRef = this.dialog.open(ConfirmBoardForLoadDialogueComponent, {
          width: '450px',
          data: {board: this.currentBoard}
        });

        dialogRef.afterClosed().subscribe(userResponse => {
          if (userResponse.confirmBoardLoad) {

            this.setBoardOnService(this.currentBoard).subscribe(() => {
              observer.next(true);
              observer.complete();

            }, err => {
              console.error('Unable to setup dashboard with current board');
              console.error(err);
              observer.error('Unable to setup dashboard with current board');

            })


          } else {

            // User wishes to load a differnt board
            this.configureNewBoardWizard().subscribe( () => {
              observer.next(true);
              observer.complete();

            })
          }
        });

      } else {
        // Need to prompt the user to set up a micro-controller
        console.error('Cannot load the dashboards micro-controller, board not defined.');
        observer.error('Cannot load dashboard, board not defined.');

      }


    });
  }


  /**
   * setBoardOnService
   *
   * Set a board on the service
   *
   * @param currentBoard ConnectedBoard  the board to be set in the service
   */
  setBoardOnService(currentBoard: ConnectedBoard): Observable<boolean> {
    return new Observable(observer => {
      this.boardBrokerServiceService.setBoard(currentBoard).subscribe(() => {
        // Current board successfully set on boardBrokerService
        observer.next(true);
        observer.complete();

      }, err => {
        console.error(err);
        observer.error('Failed to set current board');

      });

    });
  }


  /**
   * configureNewBoardWizard
   *
   * Gets the user to configure a new board for use with this dashboard
   *
   * WARNING: THIS CURRENTLY EDITS THE PASSED DASHBOARD DIRECTLY
   *
   * TODO: Refactor this to emit the new Board, not mutate the currentDashboard
   */
  configureNewBoardWizard(): Observable<boolean> {
    return new Observable(observer => {

      const dialogRef = this.dialog.open(BoardConfiguratorDialogueWrapperComponent, {
        width: '750px',
        data: {currentDashboard: this.currentDashboard}
      });

      dialogRef.afterClosed().subscribe(() => {
        // Re-run the initial dashboard set up
        this.loadConfiguration(this.dashboardID).subscribe();

      });


    });
  }


  createNewComponent(){
    const dialogRef = this.dialog.open(NewWidgetComponent, {
      width: '650px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
    });

  }
  // // Prepped for removal
  async openDialog() {
    const dialogRef = this.dialog.open(CreateControlDialogueComponent, {
      width: '250px',
      data: {bestCake: 'LemonDrizzled', worstCake: 'Fire'}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
      this.controlsCol1.push(result);

      // Request that the board pin be updated
      this.boardBrokerServiceService.setPinConfiguration(result.boardPin, 'OUTPUT')
        .then(() => {

        }).catch(err => {
        console.error(err);
        console.error('Failed to set pin');

      })
    });
  }

  drop(event: CdkDragDrop<ControlConfiguration[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
