import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import {
  logoutUser,
  registerUser,
  tryRemoveUser,
  trySearchUser,
  resetRemoveUser,
  fetchAssociatedAccounts,
} from './social-login.actions';

import {
  selectSocialUser,
  selectIsSocialUser,
  selectSocialUserRemoved,
  selectIsNewSocialSignup,
  selectAssociatedAccounts,
  selectSocialUserRegistered,
} from './social-login.selectors';

import { AppState } from 'src/app/store/app-state';

import { RegisterSocialUser, SocialLoginState } from './social-login.models';

@Injectable({
  providedIn: 'root',
})
export class SocialLoginFacade {
  socialUser$ = this._store.select(selectSocialUser);
  isSocialUser$ = this._store.select(selectIsSocialUser);
  isNewSocialSignUp$ = this._store.select(selectIsNewSocialSignup);
  socialUserRemoved$ = this._store.select(selectSocialUserRemoved);
  associatedAccounts$ = this._store.select(selectAssociatedAccounts);
  socialUserRegistered$ = this._store.select(selectSocialUserRegistered);

  public searchUser(provider: string, providerKey: string): void {
    this._store.dispatch(trySearchUser({ provider, providerKey }));
  }

  public registerUser(registerSocialUser: RegisterSocialUser) {
    this._store.dispatch(registerUser({ registerSocialUser }));
  }

  public removeUser(loginProvider: string, providerKey: string) {
    this._store.dispatch(tryRemoveUser({ loginProvider, providerKey }));
  }

  public resetRemoveUserState() {
    this._store.dispatch(resetRemoveUser());
  }

  public associatedAccounts(): void {
    this._store.dispatch(fetchAssociatedAccounts());
  }

  public logoutUser(initialState: SocialLoginState) {
    this._store.dispatch(logoutUser({ initialState }));
  }

  constructor(private _store: Store<AppState>) {}
}
