import { createSelector } from '@ngrx/store';

import { selectConfirm } from '../new-message.selectors';

export const selectPhoneMessageLength = createSelector(
  selectConfirm,
  (state) => state.phoneMessageLength,
);

export const selectCommunicationQueue = createSelector(
  selectConfirm,
  (state) => state.queue,
);

export const selectCommunicationId = createSelector(
  selectConfirm,
  (state) => state.queue?.communicationID,
);

export const selectScheduleOptions = createSelector(
  selectConfirm,
  (state) => state.scheduleOptions,
);

export const selectSystemSettings = createSelector(
  selectConfirm,
  (state) => state.userSystemSettings,
);
