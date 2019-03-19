import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';
import {Dashboard} from './Dashboard';
import {UserService} from './user.service';
import {StdGraphQLResponseFormat} from "./APIResponseTypes/StdGraphQLResponseFormat";

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

      const postBody  = postBodyArray.join('');

      this.http.post(this.dashboardResourceURL, postBody, this.getHeaders(true))
        .pipe(map((response: StdGraphQLResponseFormat) => response.data))
        .subscribe((dashboardsObject) => {

          let dashboardsArray: Dashboard[] = [];

          for (let key in dashboardsObject) {
            dashboardsArray.push(dashboardsObject[key]);

          }

          observer.next(dashboardsArray);
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


