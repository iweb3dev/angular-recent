import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserSessionService } from '../user-session/user-session.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private _userSessionService: UserSessionService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return this.handle401Error(error);
        }

        return throwError(error);
      })
    );
  }

  private handle401Error(
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    this._userSessionService.terminateSession();
    this._router.navigate(['auth']);

    return throwError(error);
  }
}
