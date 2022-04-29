import { createAction, props } from '@ngrx/store';
import { Group } from './group.models';

export const getAllGroupsStart = createAction('[Groups] Get All Start');
export const getAllGroupsResolve = createAction('[Groups] Get All Resolve', props<{ groups: Group[] }>());
export const getAllGroupsError = createAction('[Groups] Get All Error');
