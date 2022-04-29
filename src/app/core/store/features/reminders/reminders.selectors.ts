import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';

const getFeatureSlice = createFeatureSelector<fromCore.CoreState>(fromCore.featureStore);

export const getRemindersState = createSelector(
  getFeatureSlice,
  (state) => state.reminders
);

export const getAllReminders = createSelector(
  getRemindersState,
  (state) => Object.values(state.entities)
);

export const getReminderById = createSelector(
  getRemindersState,
  (state) => (id: number) => state.entities[id]
);
