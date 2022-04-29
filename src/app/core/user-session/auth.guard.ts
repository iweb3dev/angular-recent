import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserSessionService } from './user-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _userSessionService: UserSessionService,
    private _router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    const isAuthenticated = this._userSessionService.isAuthenticated;

    if (!isAuthenticated) {
      this._userSessionService.terminateSession();

      return this._router.parseUrl('auth');
    }

    return isAuthenticated;
  }
}
