import { createAction, props } from '@ngrx/store';

import { RegisterFormModel } from '../register.models';

export const register = createAction(
  '[Auth] Register',
  props<{ registerData: RegisterFormModel }>(),
);

export const registerSuccess = createAction('[Auth] Register Success');

export const registerLogin = createAction(
  '[Auth] Register Login',
  props<{ login: string; password: string }>(),
);

export const registerFailure = createAction('[Auth] Register Failure');
