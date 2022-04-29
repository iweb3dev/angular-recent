import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllPhoneNumbers,
  selectPhoneNumbersToDelete,
  selectShowDeleteSelection
} from './phone-numbers.selectors';
import {
  getAllPhoneNumbersStart,
  selectAllPhoneNumbersForDelete,
  showDeleteSelection,
  setPhoneNumberForDelete,
  deleteSelectedPhoneNumbers,
  deleteAllPhoneNumbers,
  singlePhoneNumberDelete,
} from './phone-numbers.actions';
import { PhoneNumbersStateModel } from './phone-numbers.models';
import { Update } from '@ngrx/entity';
import { PhoneNumbers } from 'src/app/core/store/features/phone-numbers/phone-numbers.models';

@Injectable({
  providedIn: 'root'
})

export class PhoneNumbersFacade {
  allPhoneNumbers$ = this._store.select(selectAllPhoneNumbers);
  showDeleteSelection$ = this._store.select(selectShowDeleteSelection);
  phoneNumbersToDelete$ = this._store.select(selectPhoneNumbersToDelete);

  constructor(private _store: Store<PhoneNumbersStateModel>) {}

  fetchPhoneNumbers() {
    this._store.dispatch(getAllPhoneNumbersStart());
  }

  showDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: true }));
  }

  hideDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: false }));
  }

  selectAllPhoneNumbersForDelete(shouldSelect: { shouldSelect: boolean }): void {
    this._store.dispatch(selectAllPhoneNumbersForDelete(shouldSelect));
  }

  setPurchaseNumberForDelete(updatePhoneNumbers: Update<PhoneNumbers>): void {
    this._store.dispatch(setPhoneNumberForDelete({update: updatePhoneNumbers}));
  }

  deleteSelectedPhoneNumbers(): void {
    this._store.dispatch(deleteSelectedPhoneNumbers());
  }

  deleteAllPhoneNumbers(): void {
    this._store.dispatch(deleteAllPhoneNumbers());
  }

  deleteSinglePhoneNumber(id: number): void {
    this._store.dispatch(singlePhoneNumberDelete({id: id}));
  }

}
