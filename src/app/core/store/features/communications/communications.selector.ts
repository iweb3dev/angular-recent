import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCore from '../../core.store';

const getFeatureSlice = createFeatureSelector<fromCore.CoreState>(fromCore.featureStore);

const getCommunicationState = createSelector(
  getFeatureSlice,
  (state) => state.communications
);

export const getAllCommunications = createSelector(
  getCommunicationState,
  (state) => Object.values(state.entities)
);

export const getLatestCommunications = createSelector(
  getAllCommunications,
  (communications) => communications.sort((a, b) => {
    const aDate = new Date(a.endDateTime);
    const bDate = new Date(b.endDateTime);
    return aDate.getTime() - bDate.getTime();
}).slice(0, 3));

export const getLastCommunication = createSelector(
  getAllCommunications,
  (lastCommunication) => lastCommunication.sort((a, b) => {
    const aDate = new Date(a.endDateTime);
    const bDate = new Date(b.endDateTime);
    return aDate.getTime() - bDate.getTime();
  }).slice(-1));

export const getCommunicationResults = createSelector(
  getCommunicationState,
  (state) => state.communicationResults
);
