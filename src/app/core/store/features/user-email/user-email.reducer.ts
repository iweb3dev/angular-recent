import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { deleteUserEmailResolve, setUserEmails, updateUserEmailError, updateUserEmailResolve } from './user-email.actions';
import { UserEmail } from './user-email.model';

export const userEmailSlice = 'userEmail';
const userEmailAdapter = createEntityAdapter<UserEmail>();

export interface UserAddressState extends EntityState<UserEmail> {}

export const intitalState = userEmailAdapter.getInitialState();

const groupReducer = createReducer(
  intitalState,
  on(setUserEmails, (state, { emails }) => userEmailAdapter.setAll(emails, state)),
  on(deleteUserEmailResolve, (state, { emailId }) => userEmailAdapter.removeOne(emailId, state)),
  on(updateUserEmailResolve, (state, { emails }) => userEmailAdapter.updateMany(emails.map(s => ({
    changes: s,
    id: s.id
  })), state)),
  on(updateUserEmailError, (state) => ({ ...state })),
);

export function reducer(state: UserAddressState, action: Action) {
  return groupReducer(state, action);
}
