import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BillingStateModel } from '../details/billing-details.models';
import { billingFeatureKey } from './billing.reducer';

export const selectBillingState =
  createFeatureSelector<BillingStateModel>(billingFeatureKey);

export const selectPaymentProfiles = createSelector(
  selectBillingState,
  (state: BillingStateModel) => state.paymentProfiles,
);

export const selectLoadingProfiles = createSelector(
  selectBillingState,
  (state: BillingStateModel) => state.loadingProfiles,
);

export const selectHistorySearchValue = createSelector(
  selectBillingState,
  (state: BillingStateModel) => state.historySearchValue,
);
