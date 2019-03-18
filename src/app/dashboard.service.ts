import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Dashboard} from './Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardResourceURL = 'https://dashboard-service.speedyiot.tech/graphql';

  constructor(private http: HttpClient) { }


  getDashboard(dashboardID: String): Observable<Dashboard> {
    return new Observable( observer => {
      observer.complete();
    });
  }


}


