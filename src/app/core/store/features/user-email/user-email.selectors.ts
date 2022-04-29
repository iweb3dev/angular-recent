import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

export const selectUserEmailState = (state: AppState) => {
  return state.coreStore.userEmail;
};

export const getAllUserEmails = createSelector(
  selectUserEmailState,
  (state) => Object.values(state.entities)
);
