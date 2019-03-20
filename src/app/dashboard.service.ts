import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';
import {Dashboard} from './Dashboard';
import {UserService} from './user.service';
import {StdGraphQLResponseFormat} from "./APIResponseTypes/StdGraphQLResponseFormat";
import {DashboardService_deleteDashboardResponse} from "./APIResponseTypes/DashboardService_deleteDashboardResponse";
import {DashboardService_deleteDashboard} from "./APIResponseTypes/DashboardService_deleteDashboard";

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
        postBodyArray.push(`dash_${dashboardIndex}: getDashboard(boardID: \\"${dashboardID}\\"){\\n  id \\n  name\\n  widgets {\\n    type\\n    name\\n    id\\n    state\\n    boardPin\\n  }\\n  \\n  board {\\n    boardID\\n    name\\n    boardBrandName\\n    comPort\\n    fqbn\\n    \\n  }\\n  \\n}\\n`);
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
            const newDashboard: Dashboard = new Dashboard(dashboardData.id, dashboardData.name, dashboardData.board, dashboardData.widgets);
            dashboardsArray.push(newDashboard);

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

      const postBody = `{"query":"mutation {\\n  deleteDashboard(boardID: \\"${dashboardID}\\"){success,errorDescription}\\n}"}`;

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

}


