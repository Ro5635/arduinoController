import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from "rxjs";
const helper = new JwtHelperService();

/**
 * Generic JWT
 *
 */
export class JsonWebToken {
  private readonly rawToken: String;
  private readonly decodedToken: object;
  private readonly expirationDate: Date;

  constructor(rawToken: String) {

    this.rawToken = rawToken;

    this.decodedToken = helper.decodeToken(rawToken);
    this.expirationDate = helper.getTokenExpirationDate(rawToken);

  }

  /**
   * isExpired
   *
   * Returns true if token is expired, else false
   */
  isExpired(): Boolean {
    return helper.isTokenExpired(this.rawToken);

  }

  getRawToken(): String {
    return this.rawToken;
  }

  getDecodedToken(): object {
    return this.decodedToken;
  }

  getExpirationDate() {
    return this.expirationDate
  }

  /**
   * tokenRefreshTrigger
   *
   * Calls next on observable when token is in need of refresh
   */
  tokenRefreshTrigger(): Observable {
    return new Observable( observer => {
      const currentTimeStamp = new Date();

      const miliSecondsUntilTokenExpiration = this.expirationDate.getTime() - currentTimeStamp.getTime();

      // Length of time before token expiration to start the token refresh action
      const preExpirationTimeBufferMiliSeconds = 6000;

      const timeOutDelay = (miliSecondsUntilTokenExpiration) - preExpirationTimeBufferMiliSeconds;

      console.log(`Token requires refresh in ${timeOutDelay}ms`);

      setTimeout(() => {
        observer.next();

      }, timeOutDelay)


    })
  }

}
