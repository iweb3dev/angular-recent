import { createAction, props } from '@ngrx/store';
import { BoughtPhoneNumber } from 'src/app/api/users/users.models';
import { UserPhone, UserPhoneVerification, UserPhoneVerificationWithPin } from './user-phones.model';

export const setUserPhones = createAction(
  '[User Phones] Set', props<{ phoneNumbers: UserPhone[] }>()
);

export const deleteUserPhoneStart = createAction(
  '[User Phones] Delete Start', props<{ phoneId: number }>()
);
export const deleteUserPhoneResolve = createAction(
  '[User Phones] Delete Resolve', props<{ phoneId: number }>()
);

export const deleteUserPhoneError = createAction(
  '[User Phones] Delete Error'
);

export const updateUserPhoneStart = createAction(
  '[User Phones] Update Start', props<{ phone: UserPhone }>()
);
export const updateUserPhoneResolve = createAction(
  '[User Phones] Update Resolve', props<{ updatedPhone: UserPhone, phones: UserPhone[] }>()
);
export const updateUserPhoneError = createAction(
  '[User Phones] Update Error', props<{ phone: UserPhone }>()
);

export const verifyPhoneStart = createAction(
  '[User Phones] Verify Start', props<{ verification: UserPhoneVerification }>()
);
export const verifyPhoneResolve = createAction(
  '[User Phones] Verify Resolve', props<{ verification: UserPhoneVerification }>()
);
export const verifyPhoneError = createAction(
  '[User Phones] Verify Error', props<{ phoneNumber: string }>()
);

export const verifyPhoneWithPinStart = createAction(
  '[User Phones] Verify With Pin Start', props<{ verification: UserPhoneVerificationWithPin }>()
);
export const verifyPhoneWithPinError = createAction(
  '[User Phones] Verify With Pin Error'
);
