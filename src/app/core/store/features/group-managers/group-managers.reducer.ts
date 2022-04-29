import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { getAllGroupManagersResolve } from './group-managers.actions';
import { GroupManagers } from './group-managers.models';

export const groupManagersSlice = 'groupManagers';
const groupManagersAdapter = createEntityAdapter<GroupManagers>({
  selectId: (GroupManager: GroupManagers) => GroupManager.subAccountUserID
});

export interface GroupManagersState extends EntityState<GroupManagers> {}

export const initialState = groupManagersAdapter.getInitialState();

const groupManagersReducer = createReducer(
  initialState,
  on(getAllGroupManagersResolve, (state, { groupManagers }) =>
    groupManagersAdapter.setAll(groupManagers, state)
  ),
);

export function reducer(state: GroupManagersState, action: Action) {
  return groupManagersReducer(state, action);
}

const {
  selectAll,
} = groupManagersAdapter.getSelectors();

// select the array of Group Managers
export const selectAllGroupManagers = selectAll;
