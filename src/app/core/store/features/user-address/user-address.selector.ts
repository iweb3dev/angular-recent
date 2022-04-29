import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

export const selectUserAddressState = (state: AppState) => {
  return state.coreStore.userAddress;
};

export const getAllUserAddresses = createSelector(
  selectUserAddressState,
  (state) => Object.values(state.entities)
);
