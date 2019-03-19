import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private _router: Router, private _usersService: UserService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._usersService.isUserAuthenticated()) {
      return true;
    }

    // navigate to login page
    this._router.navigate(['/login']);

    return false;
  }


}
