import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { createUserAddressResolve, deleteUserAddressResolve, setUserAddresses, updateUserAddressResolve } from './user-address.actions';
import { UserAddress } from './user-address.model';

export const userAddressSlice = 'userAddress';
const userAddressAdapter = createEntityAdapter<UserAddress>();

export interface UserAddressState extends EntityState<UserAddress> {}

export const intitalState = userAddressAdapter.getInitialState();

const groupReducer = createReducer(
  intitalState,
  on(setUserAddresses, (state, { addresses }) => userAddressAdapter.setAll(addresses, state)),
  on(deleteUserAddressResolve, (state, { addresId }) => userAddressAdapter.removeOne(addresId, state)),
  on(createUserAddressResolve, (state, { address }) => userAddressAdapter.addOne(address, state)),
  on(updateUserAddressResolve, (state, { address }) => userAddressAdapter.updateOne({ id: address.id , changes: address }, state))
);

export function reducer(state: UserAddressState, action: Action) {
  return groupReducer(state, action);
}
