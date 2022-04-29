import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';
import * as fromPhoneNumbers from './phone-numbers.reducer';

const getFeatureSlice = createFeatureSelector<fromCore.CoreState>('coreStore');

export const getPhoneNumbersState = createSelector(
  getFeatureSlice,
  (state) => state.phoneNumbers
);

export const selectAllPhoneNumbers = createSelector(
  getPhoneNumbersState,
  fromPhoneNumbers.selectAllPhoneNumbers
);

export const selectShowDeleteSelection = createSelector(
  getPhoneNumbersState,
  (state) => state.showDeleteSelection
);

export const selectPhoneNumbersToDelete = createSelector(
  selectAllPhoneNumbers,
  state => state.filter(
    (phoneNumber) => phoneNumber.flaggedForDeletion)
    .map((phoneNumber) => phoneNumber.id)
);
