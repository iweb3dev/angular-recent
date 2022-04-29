import { createAction, props } from '@ngrx/store';
import { GroupManagers } from './group-managers.models';

export const getAllGroupManagersStart = createAction('[Group Managers] Get All Start');
export const getAllGroupManagersResolve = createAction(
  '[Group Managers] Get All Resolve',
  props<{ groupManagers: GroupManagers[] }>(),
);
export const getAllGroupManagersError = createAction('[Group Managers] Get All Error');
