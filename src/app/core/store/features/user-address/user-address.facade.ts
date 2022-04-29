import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { createUserAddressStart, deleteUserAddressStart, updateUserAddressStart } from './user-address.actions';
import { UserAddress } from './user-address.model';
import { getAllUserAddresses } from './user-address.selector';

@Injectable({
  providedIn: 'root'
})
export class UserAddressFacade {

  allUserAddresses$ = this._store.select(getAllUserAddresses);

  constructor(private _store: Store<AppState>) {}

  createUserAddress(address: UserAddress, withoutToast: boolean = false) {
    this._store.dispatch(createUserAddressStart({
      address: address, withoutToast: withoutToast
    }));
  }

  updateUserAddress(address: UserAddress, withoutToast: boolean = false) {
    this._store.dispatch(updateUserAddressStart({
      address: address, withoutToast: withoutToast
    }));
  }

  deleteUserAddress(addressId: number) {
    this._store.dispatch(deleteUserAddressStart({
      addresId: addressId
    }));
  }
}
