import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

export const selectMessageResultsDetail = (state: AppState) => {
  return state.messageResultsStore.messageResultsDetail;
};

export const getFilterSettings = createSelector(
  selectMessageResultsDetail,
  (state) => ({
      ...state.filters
   })
);

export const selectMessageResultOverview = createSelector(
  selectMessageResultsDetail,
  (state) => state.messageResultOverview
);

export const selectDeliveryStatistics = createSelector(
  selectMessageResultsDetail,
  (state) => state.messageResultsDeliveryStatistics
);

export const selectMessageRecipients = createSelector(
  selectMessageResultsDetail,
  (state) => state.messageRecipients
);

export const selectShowMessageRecipients = createSelector(
  selectMessageResultsDetail,
  (state) => state.showMessageRecipients
);

export const selectMessageRecipientEndpointType = createSelector(
  selectMessageResultsDetail,
   (state) => state.messageReciepientEndpointType
);

export const selectMessageSearchResult = createSelector(
  selectMessageResultsDetail,
  (state) => state.messageSearchResult
);
