import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommunicationEndpointTypes, MessageHistoryTypes, NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import { AppState } from 'src/app/store/app-state';
import {
  clearMessageResultFilters,
  fetchCommunicationSearch,
  fetchDeliveryStatisticsStart,
  fetchMessageDetailsStart,
  resetMessageRecipients,
  setEndpointTypeRecipients,
  setMessageResultsFilters,
  setMessageResultsOverview
} from './message-results-detail.actions';
import {
  CommunicationMessageTypes,
  CommunicationResultsSort
} from './message-results-detail.models';
import {
  getFilterSettings,
  selectDeliveryStatistics,
  selectMessageRecipientEndpointType,
  selectMessageRecipients,
  selectMessageResultOverview,
  selectMessageSearchResult,
  selectShowMessageRecipients
} from './message-results-detail.selectors';

@Injectable({
  providedIn: 'root'
})
export class MessageResultsDetailFacade {

  currentFilters$ = this._store.select(getFilterSettings);
  messageResultOverview$ = this._store.select(selectMessageResultOverview);
  deliveryStatistics$ = this._store.select(selectDeliveryStatistics);
  messageRecipients$ = this._store.select(selectMessageRecipients);
  showMessageRecipients$ = this._store.select(selectShowMessageRecipients);
  messageRecipientEndpointType$ = this._store.select(selectMessageRecipientEndpointType);
  selectMessageSearchResult$ = this._store.select(selectMessageSearchResult);

  constructor(private _store: Store<AppState>) {}

  getCommunicationsResults(searchCriteria: string,
    groupId?: number,
    historyTypeId?: number,
    pageSize?: number,
    pageIndex?: number) {
      this._store.dispatch(fetchCommunicationSearch({searchCriteria, groupId, historyTypeId, pageSize, pageIndex}));
    }

  setFilterSettings(filters: {
    history?: MessageHistoryTypes,
    messageType: CommunicationMessageTypes[],
    status: NotificationStatusTypes[],
    sort: CommunicationResultsSort
  }) {
    this._store.dispatch(setMessageResultsFilters({
      ...filters
    }));
  }

  clearFilterSettings() {
    this._store.dispatch(clearMessageResultFilters());
  }

  setMessageResultOverview(messageResult: CommunicationResult) {
    this._store.dispatch(setMessageResultsOverview({
      messageResults: messageResult
    }));
  }

  fetchDeliveryStatistics(id: number) {
    this._store.dispatch(fetchDeliveryStatisticsStart({
      id: id
    }));
  }

  fetchMessageDetails(id: number) {
    this._store.dispatch(fetchMessageDetailsStart({
      id: id
    }));
  }

  fetchMessageSearchResult(
    searchCriteria: string,
    groupId?: number,
    historyTypeId?: number,
    pageSize?: number,
    pageIndex?: number) {
      this._store.dispatch(fetchCommunicationSearch({
        searchCriteria, groupId, historyTypeId, pageSize, pageIndex
      }));
  }

  setCommunicationEndpointType(endpointType: CommunicationEndpointTypes) {
    this._store.dispatch(setEndpointTypeRecipients({
      eindpointType: endpointType
    }));
  }

  resetRecipients() {
    this._store.dispatch(resetMessageRecipients());
  }
}
