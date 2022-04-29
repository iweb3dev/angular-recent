import { Injectable } from '@angular/core';

import { catchError, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  showDetachedLoader,
  removeAttachedLoader,
} from '@core/store/features/loader/loader.actions';
import {
  searchUser,
  removeUser,
  registerUser,
  trySearchUser,
  tryRemoveUser,
  searchUserSuccess,
  removeUserSuccess,
  removeUserFailure,
  searchUserFailure,
  registerUserSuccess,
  registerUserFailure,
  fetchAssociatedAccounts,
  associatedAccountsSuccess,
  associatedAccountsFailure,
} from './social-login.actions';

import { SearchSocialUserResponse } from './social-login.models';
import { ExternalUserInfoModel } from '@api/external-logins/external-login.model';

import { ExternalLoginService } from '@api/external-logins/external-login.service';
import {
  ToastType,
  ToastService,
} from '@shared/components/toast/service/toast.service';

@Injectable()
export class SocialLoginEffects {
  trySearchUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(trySearchUser),
      switchMap(({ provider, providerKey }) => [
        showDetachedLoader(),
        searchUser({ provider, providerKey }),
      ]),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to search user'
        );
        return [removeAttachedLoader()];
      })
    )
  );

  searchUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(searchUser),
      switchMap(({ provider, providerKey }) =>
        this._externalLoginService
          .searchExternalLogin(provider, providerKey)
          .pipe(
            switchMap((socialUser: SearchSocialUserResponse) => [
              searchUserSuccess({ socialUser }),
              removeAttachedLoader(),
            ])
          )
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to search user'
        );
        return [searchUserFailure(), removeAttachedLoader()];
      })
    )
  );

  registerUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(registerUser),
      switchMap(({ registerSocialUser }) =>
        this._externalLoginService
          .addExternalUserLogin(registerSocialUser)
          .pipe(
            switchMap((registeredSocialUser: boolean) => [
              registerUserSuccess({ registeredSocialUser: true }), // TODO: Because API returns nothing (maps to null).
            ])
          )
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to register social user'
        );
        return [registerUserFailure()];
      })
    )
  );

  tryRemoveUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(tryRemoveUser),
      switchMap(({ loginProvider, providerKey }) => [
        showDetachedLoader(),
        removeUser({ loginProvider, providerKey }),
      ]),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to remove user'
        );
        return [removeAttachedLoader()];
      })
    )
  );

  removeUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(removeUser),
      switchMap(({ loginProvider, providerKey }) =>
        this._externalLoginService
          .removeExternalLogin(loginProvider, providerKey)
          .pipe(
            switchMap((removeSocialUser: boolean) => [
              removeUserSuccess({ removeSocialUser }),
              removeAttachedLoader(),
            ])
          )
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to remove user'
        );
        return [removeUserFailure(), removeAttachedLoader()];
      })
    )
  );

  fetchAssociatedAccounts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchAssociatedAccounts),
      switchMap(() =>
        this._externalLoginService
          .fetchAssociatedAccounts()
          .pipe(
            switchMap((associatedAccounts: ExternalUserInfoModel) => [
              associatedAccountsSuccess({ associatedAccounts }),
            ])
          )
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to fetch associated accounts'
        );
        return [associatedAccountsFailure()];
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _toastService: ToastService,
    private _externalLoginService: ExternalLoginService
  ) {}
}
