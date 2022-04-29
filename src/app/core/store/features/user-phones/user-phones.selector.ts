import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

export const selectUserPhonesState = (state: AppState) => {
  return state.coreStore.userPhones;
};

export const getAllUserPhones = createSelector(
  selectUserPhonesState,
  (state) => Object.values(state.entities)
);

export const getPhoneVerification = createSelector(
  selectUserPhonesState,
  (state) => state.phoneVerification
);
