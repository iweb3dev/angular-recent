import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoaderService } from '@shared/components/loader/loader.service';
import { of } from 'rxjs';
import {
  catchError,
  exhaustMap,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { UsersService } from 'src/app/api/users/users.service';
import { UserSessionService } from 'src/app/core/user-session/user-session.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { removeLoader } from '../loader/loader.actions';
import { setUserAddresses } from '../user-address/user-address.actions';
import { setUserEmails } from '../user-email/user-email.actions';
import { setUserPhones } from '../user-phones/user-phones.actions';
import {
  fetchUser,
  logout,
  saveCallInSettingsError,
  saveCallInSettingsResolve,
  saveCallInSettingsStart,
  saveUserProfileError,
  saveUserProfileStart,
  setMainUserInfo,
  setUser,
} from './user.actions';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchUser),

      switchMap(() =>
        this._userService.fetchUser().pipe(
          tap(() => {
            // TODO: requires refactoring on the auth level
            if (this._loaderService.hasLoaderAttached) {
              this._loaderService.removeLoader();
            }
          }),
          switchMap((user) => [setUser({ user })]),
        ),
      ),
    ),
  );

  setMainUserInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setUser),
      filter((data) => !!data.user),
      switchMap(({ user }) => [
        setMainUserInfo({
          data: {
            ...user,
            displayName: user.displayName,
            userCredits: user.userCredits,
            userPicture: user.userPicture,
            firstName: user.firstName,
            emailAddresses: user.emailAddresses,
            userSubscription: user.usersSubscription,
          },
        }),
        setUserAddresses({
          addresses: user.addresses.map((s) => ({ ...s })),
        }),
        setUserPhones({
          phoneNumbers: user.phoneNumbers.map((s) => ({ ...s })),
        }),
        setUserEmails({
          emails: user.emailAddresses.map((s) => ({ ...s })),
        }),
      ]),
    ),
  );

  saveUserProfileStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveUserProfileStart),
      exhaustMap(({ userDto }) =>
        this._userService.saveUserProfile(userDto).pipe(
          switchMap(() => {
            this._toastService.addToast(
              ToastType.Success,
              `Successfully updated user profile`,
            );
            return [fetchUser()];
          }),
          catchError(() => of(saveUserProfileError())),
        ),
      ),
    ),
  );

  saveUserProfileError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(saveUserProfileError),
        tap(() =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed updating 1 or more values of profile`,
          ),
        ),
      ),
    { dispatch: false },
  );

  saveCallInSettingsStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveCallInSettingsStart),
      exhaustMap(({ userDto }) =>
        this._userService.saveUserProfile(userDto).pipe(
          switchMap(() => {
            this._toastService.addToast(
              ToastType.Success,
              `Successfully updated call in settings`,
            );
            return [saveCallInSettingsResolve({ userDto: userDto })];
          }),
          catchError(() => of(saveCallInSettingsError())),
        ),
      ),
    ),
  );

  saveCallInSettingsError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(saveCallInSettingsError),
        tap(() =>
          this._toastService.addToast(
            ToastType.Error,
            `Failed updating call in settings`,
          ),
        ),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logout),
        tap(() => {
          this._userSessionService.terminateSession();
          this._router.navigate(['']);
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private _actions$: Actions,
    private _userService: UsersService,
    private _toastService: ToastService,
    private _router: Router,
    private _loaderService: LoaderService,
    private _userSessionService: UserSessionService,
  ) {}
}
