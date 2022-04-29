import { createAction, props } from '@ngrx/store';

import { LoginErrors, LoginModel } from '../login.models';

export const logIn = createAction('[Auth] Log In', props<LoginModel>());

export const logInSuccess = createAction('[Auth] Log In Success');

export const loginFailure = createAction(
  '[Auth] Log In Failure',
  props<{ formValidity: LoginErrors }>()
);
