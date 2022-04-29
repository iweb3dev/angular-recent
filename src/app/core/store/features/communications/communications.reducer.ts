import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Communication } from 'src/app/shared/models/domain/communication.model';
import { getAllCommunicationsResolve, getCommunicationResultsResolve } from './communications.actions';
import { CommunicationResult } from './communications.models';

export const communicationsSlice = 'communications';
const communicationsAdapter = createEntityAdapter<Communication>();

export interface CommunicationState extends EntityState<Communication> {
  communicationResults: CommunicationResult[];
}

export const intitalState = communicationsAdapter.getInitialState({
  communicationResults: []
});

const groupReducer = createReducer(
  intitalState,
  on(getAllCommunicationsResolve, (state, { communications }) =>
  communicationsAdapter.setAll(communications, state)
  ),
  on(getCommunicationResultsResolve, (state, { communications }) => ({
    ...state,
    communicationResults: communications
  }))
);

export function reducer(state: CommunicationState, action: Action) {
  return groupReducer(state, action);
}
