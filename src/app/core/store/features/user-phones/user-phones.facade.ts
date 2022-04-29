import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoughtPhoneNumber } from 'src/app/api/users/users.models';
import { AppState } from 'src/app/store/app-state';
import { deleteUserPhoneStart, updateUserPhoneStart, verifyPhoneStart, verifyPhoneWithPinStart } from './user-phones.actions';
import { UserPhone, UserPhoneVerification, UserPhoneVerificationWithPin } from './user-phones.model';
import { getAllUserPhones, getPhoneVerification } from './user-phones.selector';

@Injectable({
  providedIn: 'root'
})
export class UserPhoneFacade {

  allUserPhones$ = this._store.select(getAllUserPhones);
  phoneVerification$ = this._store.select(getPhoneVerification);

  constructor(private _store: Store<AppState>) {}

  deleteUserPhone(phoneId: number) {
    this._store.dispatch(deleteUserPhoneStart({
      phoneId: phoneId
    }));
  }

  updateUserPhone(phone: UserPhone) {
    this._store.dispatch(updateUserPhoneStart({
      phone: phone
    }));
  }

  verifyPhone(phoneVerification: UserPhoneVerification) {
    this._store.dispatch(verifyPhoneStart({
      verification: phoneVerification
    }));
  }

  verifyPhoneWithPin(phoneVerificaton: UserPhoneVerificationWithPin) {
    this._store.dispatch(verifyPhoneWithPinStart({
      verification: phoneVerificaton
    }));
  }
}
