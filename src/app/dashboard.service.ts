import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';
import {Dashboard} from './Dashboard';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardResourceURL = 'https://dashboard-service.speedyiot.tech/graphql';

  constructor(private http: HttpClient, private usersService: UserService) { }

  getDashboard(dashboardID: String): Observable<Dashboard> {
    return new Observable( observer => {

      // const postBody = ``;
      //
      // this.http.post(this.dashboardResourceURL, postBody)
      //   .pipe(map(response => response.data))
      //   .subscribe((dashboard: Dashboard) => {
      //
      //
      // });

      observer.complete();
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


