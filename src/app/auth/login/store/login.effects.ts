import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { logIn, loginFailure, logInSuccess } from './login.actions';
import { LoginErrors } from '../login.models';
import { AuthService } from '../../auth.service';

import { removeAttachedLoader } from '@core/store/features/loader/loader.actions';

@Injectable()
export class LoginEffects {
  logIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logIn),
      switchMap(({ login, password, ownerID }) =>
        this._authService.login({ login, password, ownerID }).pipe(
          switchMap(() => [logInSuccess()]),
          catchError((error: HttpErrorResponse) => {
            const errorMessage = error?.error?.error;
            const formValidity =
              errorMessage === LoginErrors.InvalidGrant
                ? LoginErrors.InvalidGrant
                : LoginErrors.Unknown;

            return [loginFailure({ formValidity }), removeAttachedLoader()];
          })
        )
      )
    )
  );

  constructor(private _actions$: Actions, private _authService: AuthService) {}
}
