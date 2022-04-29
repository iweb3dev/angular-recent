import { Action, createReducer, on } from '@ngrx/store';
import { CommunicationHistory } from 'src/app/api/communications/communications.models';
import { CommunicationEndpointTypes, MessageHistoryTypes, NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import {
  fetchDeliveryStatisticsReslove,
  fetchMessageDetailsResolve,
  fetchMessageDetailsStart,
  resetMessageRecipients,
  setEndpointTypeRecipients as setMessageRecipientsState,
  setMessageResultsFilters,
  setMessageResultsOverview,
  clearMessageResultFilters,
  fetchCommunicationSearchResolve
} from './message-results-detail.actions';
import { CommunicationMessageTypes, CommunicationResultsSort, MessageRecipient, MessageResultsDeliveryStatistics } from './message-results-detail.models';

export const messageResultsDetailSlice = 'messageResultsDetail';

export interface MessageResultsDetailState {
  filters: {
    messageType: CommunicationMessageTypes[];
    status: NotificationStatusTypes[];
    sort: CommunicationResultsSort,
    history: MessageHistoryTypes
  };
  messageResultOverview: CommunicationResult;
  messageResultsDeliveryStatistics: MessageResultsDeliveryStatistics;
  messageRecipients: MessageRecipient[];
  showMessageRecipients: boolean;
  messageRecipientsLoading: boolean;
  messageReciepientEndpointType: CommunicationEndpointTypes;
  messageSearchResult: CommunicationHistory[];
}

const initialState: MessageResultsDetailState = {
  filters: {
    messageType: Object.values(CommunicationMessageTypes).filter(s => !isNaN(+s)) as CommunicationMessageTypes[],
    status: [
      NotificationStatusTypes.started,
      NotificationStatusTypes.completed,
      NotificationStatusTypes.scheduled,
      NotificationStatusTypes.cancelled
    ],
    sort: CommunicationResultsSort.NewToOld,
    history: MessageHistoryTypes.all
  },
  messageResultOverview: null,
  messageResultsDeliveryStatistics: null,
  messageRecipients: [],
  showMessageRecipients: false,
  messageRecipientsLoading: false,
  messageReciepientEndpointType: null,
  messageSearchResult: [],
};

const messageResultsDetailReducer = createReducer(
  initialState,
  on(clearMessageResultFilters, () => ({
    ...initialState
  })),
  on(setMessageResultsFilters, (state, { sort, status, messageType, history }) => ({
    ...state,
    filters: {
      status: status,
      sort: sort,
      messageType: messageType,
      history: history
    }
  })),
  on(setMessageResultsOverview, (state, { messageResults }) => ({
    ...state,
    messageResultOverview: messageResults,
    showMessageRecipients: false
  })),
  on(fetchDeliveryStatisticsReslove, (state, { deliveryStatistics }) => ({
    ...state,
    messageResultsDeliveryStatistics: deliveryStatistics
  })),
  on(fetchMessageDetailsStart, (state) => ({
    ...state,
    messageRecipientsLoading: true
  })),
  on(fetchMessageDetailsResolve, (state, { messageRecipients }) => ({
    ...state,
    messageRecipients: messageRecipients,
    messageRecipientsLoading: false
  })),
  on(setMessageRecipientsState, (state, { eindpointType }) => ({
    ...state,
    showMessageRecipients: true,
    messageReciepientEndpointType: eindpointType
  })),
  on(resetMessageRecipients, (state) => ({
    ...state,
    showMessageRecipients: false,
    messageReciepientEndpointType: null
  })),
  on(fetchCommunicationSearchResolve, (state, { messageSearchResult }) => ({
    ...state,
    messageSearchResult
  }))
);

export function reducer(state: MessageResultsDetailState, action: Action) {
  return messageResultsDetailReducer(state, action);
}
