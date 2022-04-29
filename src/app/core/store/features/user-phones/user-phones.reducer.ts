import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { deleteUserPhoneResolve, setUserPhones, updateUserPhoneError, updateUserPhoneResolve, verifyPhoneResolve } from './user-phones.actions';
import { UserPhone, UserPhoneVerification } from './user-phones.model';

export const userPhoneSlice = 'userPhones';
const userPhonesAdapter = createEntityAdapter<UserPhone>();

export interface UserAddressState extends EntityState<UserPhone> {
  phoneVerification: UserPhoneVerification;
}

export const intitalState: UserAddressState  = userPhonesAdapter.getInitialState({
  phoneVerification: null
});

const groupReducer = createReducer(
  intitalState,
  on(setUserPhones, (state, { phoneNumbers }) => userPhonesAdapter.setAll(phoneNumbers, state)),
  on(deleteUserPhoneResolve, (state, { phoneId }) => userPhonesAdapter.removeOne(phoneId, state)),
  on(updateUserPhoneResolve, (state, { phones }) => userPhonesAdapter.updateMany(phones.map(s => ({
    changes: s,
    id: s.id
  })), state)),
  on(updateUserPhoneError, (state) => ({ ...state })),
  on(verifyPhoneResolve, (state, { verification }) => ({
    ...state,
    phoneVerification: verification
  }))
);

export function reducer(state: UserAddressState, action: Action) {
  return groupReducer(state, action);
}
