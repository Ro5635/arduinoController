import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';

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
import {BoardConfiguratorDialogueWrapperComponent} from "../../BoardComponents/board-configurator-dialogue-wrapper/board-configurator-dialogue-wrapper.component";
import {NewWidgetComponent} from "../widgets/creationWizards/new-widget/new-widget.component";
import {DashboardUpdateInput} from "../../DashboardUpdateInput";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardID: string;
  currentDashboard: Dashboard;
  SNACKBAR_DURATION = 4000;

  // Connected board is pulled out of the dashboard and stored as the ConnectedBoard type
  currentBoard: ConnectedBoard;

  constructor(public dialog: MatDialog, private boardBrokerServiceService: BoardBrokerServiceService, private route: ActivatedRoute, private dashboardService: DashboardService, private router: Router, private snackBar: MatSnackBar) {
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
    this.boardBrokerServiceService.closeSerialPort().subscribe(() => {
    }, err => {
      console.log('Failed to shutdown dashboard cleanly');
    });
  }


  /**
   * boardRequest
   *
   * Handle requests from the controls within this dash and pass the events on to the  boardBrokerService
   * that will handle the requested operations
   *
   * TODO: Convert this to a Observable
   *
   * @param passedBoardRequest  BoardRequest
   */
  async boardRequest(passedBoardRequest: BoardRequest) {
    try {
      await this.boardBrokerServiceService.boardRequest(passedBoardRequest);

    } catch (err) {
      console.error('Board request failed');
    }

    // Due to lack of dev time between now and FYP deadline
    // just count this as a detection of any change and push the whole
    // widgets to the server , this has many flaws but will do...
    this.saveCurrentWidgetConfiguration().subscribe(() => {
      console.log('Dashboard Widget updates pushed to server successfully');
    });

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
            this.configureNewBoardWizard().subscribe(() => {
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


  /**
   * createNewComponent
   *
   * Handles a user request to create a new widget, starts the UI task flow
   */
  createNewComponent() {
    const dialogRef = this.dialog.open(NewWidgetComponent, {
      width: '650px',
      data: {currentBoard: this.currentBoard, currentDashboard: this.currentDashboard}
    });

    dialogRef.afterClosed().subscribe((result: ControlConfiguration) => {
    });

  }


  /**
   * removeWidgetEventHandler
   *
   * Handles requests from Widgets to remove a widget from the dashboard
   *
   * @param widgetID string
   */
  removeWidgetEventHandler(widgetID: string) {
    this.currentDashboard.removeWidget(widgetID);

    this.saveCurrentWidgetConfiguration().subscribe(() => {

      // Show a snackbar notification of successful widget removal
      this.snackBar.open('Widget Removed', 'Widget', {
        duration: this.SNACKBAR_DURATION,
      });


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

    this.saveCurrentWidgetConfiguration().subscribe(() => {

    })
  }


  /**
   * saveCurrentWidgetConfiguration
   *
   * Save The current widget configuration to the backend
   */
  private saveCurrentWidgetConfiguration() {
    return new Observable(observer => {
      // Persist the updates to the layout of the dashboard
      let dashboardUpdate = new DashboardUpdateInput();

      dashboardUpdate.id = this.currentDashboard.getID();
      dashboardUpdate.widgets = this.currentDashboard.widgets;

      this.dashboardService.updateDashboard(dashboardUpdate).subscribe(() => {
        console.log('Dashboard configuration update saved');
        observer.next();
        observer.complete();

      }, err => {
        console.error('Failed to put updated dashboard configuration to backend');
        console.error(err);
        observer.error(new Error('Failed to put updated dashboard configuration to backend'));

      })

    });
  }
}
