import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';
import {Dashboard} from './Dashboard';
import {UserService} from './user.service';
import {StdGraphQLResponseFormat} from "./APIResponseTypes/StdGraphQLResponseFormat";
import {DashboardService_deleteDashboardResponse} from "./APIResponseTypes/DashboardService_deleteDashboardResponse";
import {DashboardService_deleteDashboard} from "./APIResponseTypes/DashboardService_deleteDashboard";
import {UserService_RegisterDashboardResponse_GraphQL} from "./APIResponseTypes/UserService_RegisterDashboardResponse_GraphQL";
import {UserService_RegisterDashboardResponse} from "./APIResponseTypes/UserService_RegisterDashboardResponse";
import {DashboardUpdateInput} from "./DashboardUpdateInput";
import {StandardRequestResponse} from "./APIResponseTypes/StandardRequestResponse";
import {DashboardService_updateDashboardResponse} from "./APIResponseTypes/DashboardService_updateDashboardResponse";
import {ConnectedBoard} from "./BoardClasses/ConnectedBoard";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardResourceURL = 'https://dashboard-service.speedyiot.tech/graphql';

  constructor(private http: HttpClient, private usersService: UserService) {
  }


  /**
   * getDashboards
   *
   * @param dashboardIDArray
   */
  getDashboards(dashboardIDArray: [String]): Observable<Dashboard[]> {
    return new Observable(observer => {

      let postBodyArray = [];

      postBodyArray.push('{"query":" {');

      let dashboardIndex = 0;
      for (let dashboardID of dashboardIDArray) {
        postBodyArray.push(`dash_${dashboardIndex}: getDashboard(boardID: \\"${dashboardID}\\"){\\n  id \\n  name\\n  widgets {\\n    type\\n    name\\n    id\\n    state\\n    boardPin\\n  }\\n  \\n  board {boardID, name, boardBrandName, comPort, fqbn, digitalPins, analogPins, pwmPins }\\n  \\n}\\n`);
        dashboardIndex++;

      }

      postBodyArray.push(`}"}`);

      const postBody = postBodyArray.join('');

      this.http.post(this.dashboardResourceURL, postBody, this.getHeaders(true))
        .pipe(map((response: StdGraphQLResponseFormat) => response.data))
        .subscribe((dashboardsObject) => {

          let dashboardsArray: Dashboard[] = [];

          for (let key in dashboardsObject) {
            const dashboardData = dashboardsObject[key];

            // Only proceed if there is a dashboard returned for this key
            if (dashboardData) {

              // Create the dashboard's Board from the supplied board data
              const boardData = dashboardData.board;


              let newBoard;

              // If there is a board available in this dash instantiate it
              if (boardData) {
                newBoard = new ConnectedBoard(boardData.boardBrandName, boardData.digitalPins, boardData.analogPins, boardData.pwmPins, boardData.fqbn, boardData.comPort, 'NOTIMPLEMENTEDYET');

              } else {
                newBoard = undefined;
              }

              if (!dashboardData.widgets) {
                dashboardData.widgets = [[]];
              }


              const newDashboard: Dashboard = new Dashboard(dashboardData.id, dashboardData.name, newBoard, dashboardData.widgets);
              dashboardsArray.push(newDashboard);

            } else {
              console.log('Failed to get a dashboard');

            }
          }

          observer.next(dashboardsArray);
          observer.complete();

        });

    });
  }


  /**
   * deleteDashboard
   *
   * @param dashboardID string  Dashboard for deletion
   */
  deleteDashboard(dashboardID: string): Observable<DashboardService_deleteDashboardResponse> {
    return new Observable<DashboardService_deleteDashboardResponse>(observer => {

      const postBody = `{"query":"mutation {deleteDashboard(boardID: \\"${dashboardID}\\"){success,errorDescription}\\n}"}`;

      this.http.post(this.dashboardResourceURL, postBody, this.getHeaders(true))
        .pipe(map((response: DashboardService_deleteDashboard) => response.data.deleteDashboard))
        .subscribe((dashboardsObject: DashboardService_deleteDashboardResponse) => {

          const response = new DashboardService_deleteDashboardResponse(dashboardsObject.success, dashboardsObject.errorDescription);
          observer.next(response);

          observer.complete();

        });
    });
  }


  /**
   * updateDashboard
   *
   * Updates a dashboard, requires a DashboardUpdateInput, this must have the dashboardID specified
   *
   * TODO: More inelegant updates to dashboard widgets in place of current wholesale replacement
   *
   * @param dashboardUpdates
   */
  updateDashboard(dashboardUpdates: DashboardUpdateInput): Observable<boolean> {
    return new Observable(observer => {

      // Basic validation
      if (!dashboardUpdates.id) {
        console.error('Update to dashboard was requested without an dashboardID');
        return observer.error(new Error('No DashboardID was provided to updateDashboard request'));
      }

      let query = `mutation ($dashboardUpdates: DashboardInput!){updateDashboard(dashboardUpdates: $dashboardUpdates){errorDescription,success}}`;

      const variables = {dashboardUpdates};

      // Build the postBody for the graphQL request
      const postBody = JSON.stringify({query, variables});


      this.http.post(`${this.dashboardResourceURL}`, postBody, this.getHeaders(true))
        .pipe(
          map((response: DashboardService_updateDashboardResponse) => response.data.updateDashboard),
          catchError(this.handleError('updateDashboard', {}))
        ).subscribe((updateDashboardResponse: StandardRequestResponse) => {

          if (updateDashboardResponse.success) {
            // Updates applied successfully
            observer.next(true);
            return observer.complete();

          }

          observer.error(new Error('Failed to update dashboard'));

      });


    });
  }


  /**
   * getHeaders
   *
   * Get headers for use with http requests
   *
   * @param withJWT   Boolean   Attach users JWT
   * @return httpOptions
   */
  private getHeaders(withJWT: Boolean = false) {

    if (withJWT) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'jwt': this.usersService.getUsersJWT().getRawToken()
        })
      };

    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}


