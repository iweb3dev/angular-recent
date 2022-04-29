import { Action, createReducer, on } from '@ngrx/store';
import { getAccountOverViewResolve } from './account-overview.actions';

export const accountOverviewsSlice = 'accountOverview';

export interface AccountOverviewState {
  totalGroupMembers: number;
  totalActiveAddresses: number;
  totalActivePhoneNumbers: number;
  totalActiveEmailAddresses: number;
  hasLoaded: boolean;
}

const AccountOverviewInitialState: AccountOverviewState = {
  totalGroupMembers: 0,
  totalActiveAddresses: 0,
  totalActivePhoneNumbers: 0,
  totalActiveEmailAddresses: 0,
  hasLoaded: false,
};

const accountOverviewReducer = createReducer(
  AccountOverviewInitialState,
  on(
    getAccountOverViewResolve,
    (
      state,
      {
        totalGroupMembers,
        totalActiveAddresses,
        totalActivePhoneNumbers,
        totalActiveEmailAddresses,
      }
    ) => ({
      ...state,
      totalGroupMembers: totalGroupMembers,
      totalActiveAddresses: totalActiveAddresses,
      totalActivePhoneNumbers: totalActivePhoneNumbers,
      totalActiveEmailAddresses: totalActiveEmailAddresses,
      hasLoaded: true,
    })
  )
);

export function reducer(state: AccountOverviewState, action: Action) {
  return accountOverviewReducer(state, action);
}
