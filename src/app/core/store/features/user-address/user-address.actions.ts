import { createAction, props } from '@ngrx/store';
import { UserAddress } from './user-address.model';

export const setUserAddresses = createAction(
  '[User Address] Set', props<{ addresses: UserAddress[] }>()
);

export const deleteUserAddressStart = createAction(
  '[User Address] Delete Start', props<{ addresId: number }>()
);
export const deleteUserAddressResolve = createAction(
  '[User Address] Delete Resolve', props<{ addresId: number }>()
);

export const deleteUserAddressError = createAction(
  '[User Address] Delete Error'
);

export const createUserAddressStart = createAction(
  '[User Address] Create Start', props<{ address: UserAddress, withoutToast?: boolean }>()
);
export const createUserAddressResolve = createAction(
  '[User Address] Create Resolve', props<{ address: UserAddress, withoutToast?: boolean }>()
);

export const createUserAddressError = createAction(
  '[User Address] Create Error'
);

export const updateUserAddressStart = createAction(
  '[User Address] Update Start', props<{ address: UserAddress, withoutToast?: boolean }>()
);
export const updateUserAddressResolve = createAction(
  '[User Address] Update Resolve', props<{ address: UserAddress, withoutToast?: boolean }>()
);

export const updateUserAddressError = createAction(
  '[User Address] Update Error'
);
