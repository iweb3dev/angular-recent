import { Action, createReducer, on } from '@ngrx/store';

import { BillingStateModel } from '../details/billing-details.models';

import {
  resetSearch,
  searchHistory,
  setPaymentProfiles,
} from './billing.actions';

export const billingFeatureKey = 'billing';

const initialState: BillingStateModel = {
  paymentProfiles: null,
  loadingProfiles: true,
  historySearchValue: null,
};

const billingReducer = createReducer(
  initialState,
  on(setPaymentProfiles, (state, action) => ({
    ...state,
    paymentProfiles: action.profiles,
    loadingProfiles: false,
  })),
  on(searchHistory, (state, action) => ({
    ...state,
    historySearchValue: action.value,
  })),
  on(resetSearch, (state) => ({
    ...state,
    historySearchValue: null,
  })),
);

export function reducer(state: BillingStateModel, action: Action) {
  return billingReducer(state, action);
}
