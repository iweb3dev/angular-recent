import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/store/app-state';
import { UserStateModel } from './user.model';

export const selectUserState = (state: AppState) => {
  return state.coreStore.user;
};

export const selectUserInfo = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user
);

export const selectMainUserInfo = createSelector(
  selectUserState,
  (state: UserStateModel) => state.mainUserInfo
);

export const selectCallerIds = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user?.callerIds
);

export const selectUserId = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user?.id
);

export const selectCustomerProfileId = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user?.customerProfileID
);

export const selectUserPackage = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user?.package
);

export const selectedBoughtPhoneNumbers = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user?.boughtPhoneNumbers
);

export const selectedPhoneNumbers = createSelector(
  selectUserState,
  (state: UserStateModel) =>
    state.user?.phoneNumbers &&
    state.user?.phoneNumbers.filter((phoneNumber) => phoneNumber.isValidated)
);

export const selectPrimaryEmail = createSelector(
  selectUserState,
  (state: UserStateModel) => state.user.emailAddresses?.find((emails) => emails.isPrimary)
);
