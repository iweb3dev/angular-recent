import { createAction, props } from '@ngrx/store';
import { Communication } from 'src/app/shared/models/domain/communication.model';
import { CommunicationResult } from './communications.models';

export const getAllCommunicationsStart = createAction('[Communications] Get All Start');
export const getAllCommunicationsResolve = createAction('[Communications] Get All Resolve', props<{ communications: Communication[] }>());
export const getAllCommunicationsError = createAction('[Communications] Get All Error');

export const getCommunicationResultsStart = createAction('[Communications] Get Results Start');
export const getCommunicationResultsResolve = createAction('[Communications] Get Results Resolve',
 props<{ communications: CommunicationResult[] }>());
export const getCommunicationResultsError = createAction('[Communications] Get Results Error');
