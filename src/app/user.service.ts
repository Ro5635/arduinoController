import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap, catchError, map} from 'rxjs/operators';
import {LoginResourceResponse} from './login-form/LoginResourceResponse';
import {JsonWebToken} from './JsonWebToken';
import {User} from './User';
import {UserService_getUserResponse} from "./APIResponseTypes/UserService_getUserResponse";
import {UserService_getRefreshToken} from "./APIResponseTypes/UserService_getRefreshToken";
import {UserService_login} from "./APIResponseTypes/UserService_login";
import {Dashboard} from "./Dashboard";
import {UserService_RegisterDashboardResponse_GraphQL} from "./APIResponseTypes/UserService_RegisterDashboardResponse_GraphQL";
import {UserService_RegisterDashboardResponse} from "./APIResponseTypes/UserService_RegisterDashboardResponse";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersServiceAPIURL = 'https://user-service.speedyiot.tech';
  private usersJWT: JsonWebToken;
  private currentUser: User;
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.attemptResumeSession();
  }


  /**
   * getUser
   *
   * Gets a User object from either the service or locally
   *
   * @param forceFromService Boolean to force refresh from service
   */
  getUser(forceFromService: boolean = false): Observable<User> {
    return new Observable(observer => {
      if (this.currentUser && !forceFromService) {
        observer.next(this.currentUser);
        observer.complete();
      }

      // Get current user from service
      this.getUserFromService().subscribe(newUser => {
        observer.next(newUser);
        observer.complete();
      });

    });
  }


  /**
   * registerNewDashboard
   *
   * Registers a new dashboard to the user, will resolve the new dashboardID
   * @return Observable DashbaordID<String>
   */
  registerNewDashboard(): Observable<string> {
    return new Observable(observer => {

      // Requests success and JWT from querying login graphQL resource
       const query = `mutation ($newDashboardName: String!) {
        registerNewDashboard(dashboard: {name: $newDashboardName} ) {
          success
          errorDescription
          newDashboardID
        }}`;

       const variables = {"newDashboardName": "New_Name"};

      const postBody = JSON.stringify({query, variables});


      this.http.post(`${this.usersServiceAPIURL}/graphql`, postBody, this.getHeaders(true))
        .pipe(
          map((response: UserService_RegisterDashboardResponse_GraphQL) => response.data.registerNewDashboard),
          catchError(this.handleError('registerNewDashboard', {}))
        ).subscribe((registerDashboardResponse: UserService_RegisterDashboardResponse) => {

          if (registerDashboardResponse.success) {
            // Successfully registered a new dashboard, resolve the new dashboardID to the caller
            observer.next(registerDashboardResponse.newDashboardID);
          } else {
            console.error(`Call to register a new dashboard failed, error: ${registerDashboardResponse.errorDescription}`);

          }

        observer.complete();

      });

    });
  }


  /**
   * attemptLogin
   *
   * Attempt authenticate the user and acquire a new JWT
   *
   * TODO: Clean up this observable
   *
   * @param userEmail  string 'rob@example.com'
   * @param userPassword  string raw password  'greenEggsAndHam!'
   */
  attemptLogin(userEmail: string, userPassword: string): Observable<any> {

    // Requests success and JWT from querying login graphQL resource
    const postBody = `{"query":"{ login(email: \\"${userEmail}\\", password: \\"${userPassword}\\") { success\\n    jwt}}"}`;

    return this.http.post(`${this.usersServiceAPIURL}/login`, postBody, this.getHeaders())
      .pipe(
        map((response: UserService_login) => response.data.login),
        tap((loginResponse: LoginResourceResponse) => {

          if (loginResponse.success) {
            console.log(`Successfully authenticated user`);

            // Update login state to logged in
            this.isLoggedIn = true;

            this.storeNewJWT(loginResponse.jwt);

            // Request a user so to populate the cache
            this.getUserFromService().subscribe();

          } else {
            console.log('Failed to authenticate user');


          }

        }),
        catchError(this.handleError('login', {}))
      );

  }


  /**
   * refreshToken
   *
   * Refreshes the current token by requesting a new one from the service
   */
  refreshToken(): Observable<object> {
    return new Observable(observer => {

      // The ID in this query is currently ignored, but required.
      const postBody = `{"query":"{getRefreshToken (id: \\"test\\"){success, jwt, errorDescription}}"}`;

      this.http.post(`${this.usersServiceAPIURL}/graphql`, postBody, this.getHeaders(true))
        .pipe(
          map((response: UserService_getRefreshToken) => response.data.getRefreshToken),
          tap((refreshResponse: LoginResourceResponse) => {

            if (refreshResponse.success) {
              this.storeNewJWT(refreshResponse.jwt);
              console.log(`Successfully got refresh token`);
            } else {
              console.log('Failed to get new refresh token');

            }

          }),
          catchError(this.handleError('login', {}))
        ).subscribe((refreshResponse: LoginResourceResponse) => {

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

      });

    });

  }


  /**
   * attemptResumeSession
   *
   * Attempts to resume an existing session by getting a JWT out of local storage
   *
   */
  private attemptResumeSession() {
    const existingRawJWT = localStorage.getItem('userJWT');

    if (existingRawJWT) {

      const existingToken = new JsonWebToken(existingRawJWT);

      if (!existingToken.isExpired()) {
        console.log('Using existing authentication token');
        this.storeNewJWT(existingRawJWT);
        // Set state to be logged in
        this.isLoggedIn = true;

        // Refresh the token to ensure that it is current
        this.refreshToken().subscribe(result => {
        });
      }

    }


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
   * @param newJWT  The replacement raw JWT string
   */
  private storeNewJWT(newJWT: string): void {
    this.usersJWT = new JsonWebToken(newJWT);

    // Persist the JWT to the browsers local storage
    localStorage.setItem('userJWT', this.usersJWT.getRawToken());

    // Subscribe to the tokens refresh trigger
    this.usersJWT.tokenRefreshTrigger().subscribe(trigger => {
      // the JWT needs refreshing
      this.refreshToken().subscribe();

    });

  }


  /**
   * getUsersJWT
   *
   *  Used by other services to access the users current JWT
   *  for authentication against other APIs
   */
  getUsersJWT(): JsonWebToken {
    return this.usersJWT;
  }


  /**
   * getUserFromService
   *
   * Gets a User object from the user service
   */
  private getUserFromService(): Observable<User> {
    return new Observable(observer => {

      const postBody = ` {"query":"{ getUser(id: null) {id\\n name\\n    dashboards\\n subscriptions}}"}`;

      // Make HTTP call to the users service for the user object
      this.http.post(`${this.usersServiceAPIURL}/graphql`, postBody, this.getHeaders(true))
        .pipe(
          map((response: UserService_getUserResponse) => response.data.getUser),
          catchError(this.handleError('login', {}))
        )
        .subscribe((userResponse: User) => {

          // Set the current user to the received user object
          this.currentUser = new User(userResponse.id, userResponse.name, userResponse.dashboards, userResponse.subscriptions);
          console.log('Current User updated');

          observer.next(this.currentUser);
          observer.complete();

        });

    });
  }

  /**
   * isUserAuthenticated
   *
   * Returns a boolean representing if the user is currently authenticated
   */
  isUserAuthenticated(): boolean {
    return this.isLoggedIn;
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
