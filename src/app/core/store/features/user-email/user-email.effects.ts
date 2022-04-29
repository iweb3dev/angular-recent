import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UsersService } from 'src/app/api/users/users.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { AppState } from 'src/app/store/app-state';
import {
  deleteUserEmailError,
  deleteUserEmailResolve,
  deleteUserEmailStart,
  updateUserEmailError,
  updateUserEmailResolve,
  updateUserEmailStart
 } from './user-email.actions';
import { UserEmail } from './user-email.model';
import { getAllUserEmails } from './user-email.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserEmailEffects {

  deleteEmailPhone$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserEmailStart),
    exhaustMap(({ emailId }) => this._userService.deleteUserEmail(emailId)
    .pipe(switchMap(() => [
      deleteUserEmailResolve({ emailId: emailId })]),
    catchError(() => of(deleteUserEmailError()))))
  ));

  deleteUserEmailResolve$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserEmailResolve),
    tap(() => this._toastService.addToast(ToastType.Success, `Successfully deleted email address`))
  ), { dispatch: false });

  deleteUserEmailError$ = createEffect(() => this._actions$.pipe(
    ofType(deleteUserEmailError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed to delete email address`))
  ), { dispatch: false });

  updateUserEmailStart$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserEmailStart),
    concatMap(({ email }) => this._userService.updateUserEmail(email).pipe(
      withLatestFrom(this._store.select(getAllUserEmails)),
      switchMap(([result, userEmails]) => {
        const emails = userEmails.map(s => {
          if (s.id === email.id) {
            return { ...s, ...email };
          } else {
            if (email.isPrimary) {
              return { ...s, isPrimary: false };
            }
            return { ...s };
          }
        });
        return [updateUserEmailResolve({ emails: emails, updatedEmail: email })];
      }),
      catchError(() => of(updateUserEmailError({ email: email })))
    ))
  ));

  updateUserEmailResolve$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserEmailResolve),
    tap(({ updatedEmail }) => this._toastService.addToast(ToastType.Success, `Successfully updated email address ${updatedEmail.email}`))
  ), { dispatch: false });

  updateUserEmailError$ = createEffect(() => this._actions$.pipe(
    ofType(updateUserEmailError),
    tap(({ email }) => this._toastService.addToast(ToastType.Error, `Failed updating email address ${email.email}`))
  ), { dispatch: false });

  constructor(
    private _actions$: Actions,
    private _userService: UsersService,
    private _toastService: ToastService,
    private _store: Store<AppState>) {}
}
