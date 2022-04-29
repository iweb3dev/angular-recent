import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { getAllGroupsResolve } from './group.actions';
import { Group } from './group.models';

export const groupSlice = 'groups';
const groupAdapter = createEntityAdapter<Group>();

export interface GroupState extends EntityState<Group> {}

export const intitalState = groupAdapter.getInitialState();

const groupReducer = createReducer(
  intitalState,
  on(getAllGroupsResolve, (state, { groups }) =>
    groupAdapter.setAll(groups, state)
  )
);

export function reducer(state: GroupState, action: Action) {
  return groupReducer(state, action);
}
