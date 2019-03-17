import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {tap, catchError, map} from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import {LoginResourceResponse} from "./login-form/LoginResourceResponse";
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersServiceAPIURL = 'https://user-service.speedyiot.tech';
  currentJWT: String = '';
  currentDecodedJWT = {};

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
     })
  };

  private storeNewJWT(newJWT: String): void {
    this.currentJWT = newJWT;
    this.currentDecodedJWT = helper.decodeToken(newJWT);
    // const expirationDate = helper.getTokenExpirationDate(myRawToken);
    // const isExpired = helper.isTokenExpired(myRawToken);


  }

  getUser() {

  }

  attemptLogin(userEmail: String, userPassword: String): Observable {

    const postBody = `{"query":"{ login(email: \\"${userEmail}\\", password: \\"${userPassword}\\") { success\\n    jwt}}"}
    `;

    return this.http.post(`${this.usersServiceAPIURL}/login`, postBody, this.httpOptions)
      .pipe(
        map(response =>  response.data.login),
        tap((loginResponse: LoginResourceResponse) => {

          if (loginResponse.success) {
            this.storeNewJWT(loginResponse.jwt);
            console.log(`Successfully authenticated user`);
          } else {
            console.log('Failed to authenticate user');


          }

        }),
        catchError(this.handleError('login', {}))
      )

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
