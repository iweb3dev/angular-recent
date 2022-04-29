import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { PaymentProfile } from 'src/app/api/financials/financials.models';

import {
  BillingPaymentProfile,
  BillingStateModel,
} from '../details/billing-details.models';

import {
  createPaymentProfile,
  deleteProfile,
  resetSearch,
  searchHistory,
  setPaymentProfiles,
  updatePaymentProfile,
} from './billing.actions';
import {
  selectHistorySearchValue,
  selectPaymentProfiles,
} from './billing.selectors';

@Injectable()
export class BillingFacade {
  paymentProfiles$ = this._store.select(selectPaymentProfiles);
  loadingProfiles$ = this._store.select(selectPaymentProfiles);
  historySearchValue$ = this._store.select(selectHistorySearchValue);

  constructor(private _store: Store<BillingStateModel>) {}

  setPaymentProfiles(profiles: BillingPaymentProfile[]): void {
    this._store.dispatch(setPaymentProfiles({ profiles }));
  }

  createPaymentProfile(data: Partial<PaymentProfile>): void {
    this._store.dispatch(createPaymentProfile({ data }));
  }

  deleteProfile(profile: BillingPaymentProfile): void {
    this._store.dispatch(deleteProfile({ profile }));
  }

  updatePaymentProfile(data: {
    data: Partial<PaymentProfile>;
    profile: BillingPaymentProfile;
  }): void {
    this._store.dispatch(updatePaymentProfile(data));
  }

  searchHistory(value: string): void {
    this._store.dispatch(searchHistory({ value }));
  }

  resetSearch(): void {
    this._store.dispatch(resetSearch());
  }
}
