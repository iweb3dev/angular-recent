import { createAction, props } from '@ngrx/store';
import { CommunicationHistory } from 'src/app/api/communications/communications.models';
import { CommunicationEndpointTypes, MessageHistoryTypes, NotificationStatusTypes } from 'src/app/api/shared/shared.enums';
import { CommunicationResult } from 'src/app/core/store/features/communications/communications.models';
import { CommunicationMessageTypes, CommunicationResultsSort, MessageRecipient, MessageResultsDeliveryStatistics } from './message-results-detail.models';


export const setMessageResultsFilters = createAction('[Message Results Detail] Set Filters', props<{
  messageType: CommunicationMessageTypes[],
  status: NotificationStatusTypes[],
  sort: CommunicationResultsSort,
  history?: MessageHistoryTypes,
}>());

export const clearMessageResultFilters = createAction('[Message Results Detail] Clear Filters');

export const setMessageResultsOverview = createAction('[Message Results Overview] Set', props<{ messageResults: CommunicationResult }>());

export const fetchDeliveryStatisticsStart = createAction('[Message Results Overview] Fetch Delivery Statistics Start',
 props<{ id: number }>());
export const fetchDeliveryStatisticsReslove = createAction('[Message Results Overview] Fetch Delivery Statistics Reslove',
 props<{ deliveryStatistics: MessageResultsDeliveryStatistics }>());
export const fetchDeliveryStatisticsError = createAction('[Message Results Overview] Fetch Delivery Statistics Error');

export const fetchMessageDetailsStart = createAction('[Message Results Overview] Fetch Details Start', props<{
  id: number
}>());
export const fetchMessageDetailsResolve = createAction('[Message Results Overview] Fetch Details Resolve', props<{
  messageRecipients: MessageRecipient[]
}>());
export const fetchMessageDetailsError = createAction('[Message Results Overview] Fetch Details Error');

export const fetchCommunicationSearch = createAction('[Message Results Overview] Fetch Communication Search', props<{
  searchCriteria: string,
  groupId?: number,
  historyTypeId?: number,
  pageSize?: number,
  pageIndex?: number
}>());

export const fetchCommunicationSearchResolve = createAction('[Message Results Overview] Fetch Communication Search Resolve', props<{
  messageSearchResult: CommunicationHistory[]
}>());

export const fetchCommunicationSearchError = createAction('[Message Results Overview] Fetch Communication Search Error');

export const setEndpointTypeRecipients = createAction('[Message Results Overview] Set Endpoint Type Recipients', props<{
  eindpointType: CommunicationEndpointTypes
}>());

export const resetMessageRecipients = createAction('[Message Results Overview] Reset Recipients');
