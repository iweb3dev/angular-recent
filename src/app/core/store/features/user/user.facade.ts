import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import {
  saveCallInSettingsStart,
  saveUserProfileStart,
  logout,
  fetchUser,
} from './user.actions';
import { MainUserInfoModel } from './user.model';
import {
  selectCallerIds,
  selectCustomerProfileId,
  selectedBoughtPhoneNumbers,
  selectedPhoneNumbers,
  selectMainUserInfo,
  selectPrimaryEmail,
  selectUserId,
  selectUserInfo,
  selectUserPackage,
} from './user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  currentUserFullInfo$ = this._store.select(selectUserInfo);
  currentUserInfo$ = this._store.select(selectMainUserInfo);
  callerIds$ = this._store.select(selectCallerIds);
  boughtPhoneNumbers$ = this._store.select(selectedBoughtPhoneNumbers);
  phoneNumbers$ = this._store.select(selectedPhoneNumbers);
  userId$ = this._store.select(selectUserId);
  customerProfileId$ = this._store.select(selectCustomerProfileId);
  userPackage$ = this._store.select(selectUserPackage);
  primaryEmail$ = this._store.select(selectPrimaryEmail);

  constructor(private _store: Store<AppState>) {}

  saveProfileSettings(userDto: MainUserInfoModel) {
    this._store.dispatch(
      saveUserProfileStart({
        userDto: userDto,
      }),
    );
  }

  saveCallInSettings(userDto: MainUserInfoModel) {
    this._store.dispatch(
      saveCallInSettingsStart({
        userDto: userDto,
      }),
    );
  }

  logOut() {
    this._store.dispatch(logout());
  }

  fetchUser(): void {
    this._store.dispatch(fetchUser());
  }
}
