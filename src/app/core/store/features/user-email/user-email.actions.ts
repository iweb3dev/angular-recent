import { createAction, props } from '@ngrx/store';
import { UserEmail } from './user-email.model';

export const setUserEmails = createAction(
  '[User Email] Set', props<{ emails: UserEmail[] }>()
);

export const deleteUserEmailStart = createAction(
  '[User Email] Delete Start', props<{ emailId: number }>()
);
export const deleteUserEmailResolve = createAction(
  '[User Email] Delete Resolve', props<{ emailId: number }>()
);

export const deleteUserEmailError = createAction(
  '[User Email] Delete Error'
);

export const updateUserEmailStart = createAction(
  '[User Email] Update Start', props<{ email: UserEmail }>()
);
export const updateUserEmailResolve = createAction(
  '[User Email] Update Resolve', props<{ emails: UserEmail[], updatedEmail: UserEmail }>()
);
export const updateUserEmailError = createAction(
  '[User Email] Update Error', props<{ email: UserEmail }>()
);
