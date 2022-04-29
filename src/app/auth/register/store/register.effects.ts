import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { removeLoader } from '../../../core/store/features/loader/loader.actions';
import { register, registerLogin, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(register),
      switchMap(({ registerData }) =>
        this._authService.register(registerData).pipe(
          switchMap(() => [
            registerLogin({
              login: registerData.userPhoneNumber,
              password: registerData.password,
            }),
            registerSuccess(),
            removeLoader(),
          ]),
          catchError((error: HttpErrorResponse) => {
            console.error('Register failure ', error);
            this._authService.openErrorSnackbar(error.error || error.error[0]);
            return of(removeLoader());
          }),
        ),
      ),
    ),
  );

  registerLogin$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(registerLogin),
        switchMap(({ login, password }) =>
          this._authService
            .login({
              login,
              password,
            })
            .pipe(
              tap(() =>
                this._rout.queryParams
                  .subscribe((query) =>
                    Object.keys(query).length === 0
                      ? this._router.navigate(['/entry-plan/select-plan'])
                      : this._router.navigate(['/entry-plan/submit-plan'], {
                          queryParams: { ...query },
                        }),
                  )
                  .unsubscribe(),
              ),
              catchError((error: HttpErrorResponse) => {
                console.error('Register failure ', error);

                return EMPTY;
              }),
            ),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private _router: Router,
    private _rout: ActivatedRoute,
    private _actions$: Actions,
    private _authService: AuthService,
  ) {}
}
