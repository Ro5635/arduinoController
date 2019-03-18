import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {tap, catchError, map} from "rxjs/operators";
import {LoginResourceResponse} from "./login-form/LoginResourceResponse";
import {JsonWebToken} from "./JsonWebToken";
import {User} from "./User";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersServiceAPIURL = 'https://user-service.speedyiot.tech';
  usersJWT: JsonWebToken;
  currentUser: User;
  isLoggedIn: Boolean = false;

  constructor(private http: HttpClient) {
  }


  /**
   * getUser
   *
   * Gets a User object from either the service or locally
   *
   * @param forceFromService Boolean to force refresh from service
   */
  getUser(forceFromService: boolean = false): Observable {
    return new Observable(observer => {
      if (this.currentUser && !forceFromService) {
        observer.next(this.currentUser);
        observer.complete();
      }

      // Get current user from service
      this.getUserFromService().subscribe(newUser => {
        observer.next(newUser);
        observer.complete();
      })

    });
  }


  /**
   * attemptLogin
   *
   * Attempt authenticate the user and acquire a new JWT
   *
   * @param userEmail
   * @param userPassword
   */
  attemptLogin(userEmail: String, userPassword: String): Observable {

    // Requests success and JWT from querying login graphQL resource
    const postBody = `{"query":"{ login(email: \\"${userEmail}\\", password: \\"${userPassword}\\") { success\\n    jwt}}"}`;

    return this.http.post(`${this.usersServiceAPIURL}/login`, postBody, this.getHeaders())
      .pipe(
        map(response => response.data.login),
        tap((loginResponse: LoginResourceResponse) => {

          if (loginResponse.success) {
            console.log(`Successfully authenticated user`);

            this.storeNewJWT(loginResponse.jwt);

            // Request a user so to populate the cache
            this.getUserFromService().subscribe();

          } else {
            console.log('Failed to authenticate user');


          }

        }),
        catchError(this.handleError('login', {}))
      )

  }


  /**
   * refreshToken
   *
   * Refreshes the current token by requesting a new one from the service
   */
  refreshToken(): Observable {
    return new Observable(observer => {

      const postBody = `{"query":"{\ngetRefreshToken(id: \"5635\"){success, newJWT}}"}`;

      this.http.post(`${this.usersServiceAPIURL}/login/refresh`, postBody, this.getHeaders(true))
        .pipe(
          map(response => response.data.getRefreshToken),
          tap((refreshResponse: LoginResourceResponse) => {

            if (refreshResponse.success) {
              this.storeNewJWT(refreshResponse.jwt);
              console.log(`Successfully got refresh token`);
            } else {
              console.log('Failed to get new refresh token');

            }

          }),
          catchError(this.handleError('login', {}))
        ).subscribe(refreshResponse => {

        if (refreshResponse.success) {

          this.storeNewJWT(refreshResponse.jwt);

          // Request a user so to populate the cache
          this.getUserFromService();

          this.isLoggedIn = true;
          observer.next({success: true});

        } else {
          // ToDO: Handle this in some way, logout...
          console.error('Failed to get refresh token');
          this.isLoggedIn = false;
          observer.error(new Error('Failed to refresh JWT'));

        }

        observer.complete();

      })

    });

  }


  /**
   * getHeaders
   *
   * Get headers for use with node-fetch
   *
   * @param withJWT   Boolean   Attach users JWT
   * @return httpOptions
   */
  private getHeaders(withJWT: Boolean = false) {

    if (withJWT) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'jwt': this.usersJWT.getRawToken()
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
   * storeNewJWT
   *
   * Stores a new JWT
   *
   * @param newJWT
   */
  private storeNewJWT(newJWT: String): void {
    this.usersJWT = new JsonWebToken(newJWT);

    // Subscribe to the tokens refresh trigger
    this.usersJWT.tokenRefreshTrigger().subscribe(trigger => {
      // the JWT needs refreshing
      this.refreshToken();

    })

  }


  /**
   * getUserFromService
   *
   * Gets a User object from the user service
   */
  private getUserFromService(): Observable {
    return new Observable(observer => {

      const postBody = ` {"query":"{ getUser(id: null) {id\\n name\\n    dashboards\\n subscriptions}}"}`;

      // Make HTTP call to the users service for the user object
      this.http.post(`${this.usersServiceAPIURL}/graphql`, postBody, this.getHeaders(true))
        .pipe(
          map(response => response.data.getUser),
          catchError(this.handleError('login', {}))
        )
        .subscribe(userResponse => {

          // Set the current user to the received user object
          this.currentUser = new User(userResponse.id, userResponse.name, userResponse.dashboards, userResponse.subscriptions);
          console.log('Current User updated');

          observer.next(this.currentUser);
          observer.complete();

        })

    })
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
