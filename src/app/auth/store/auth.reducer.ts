import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { AuthState } from '../auth.models';
import { loginReducer } from '../login/store/login.reducer';
import { registerReducer } from '../register/store/register.reducer';
import { socialLoginReducer } from '../social-login/store/social-login.reducer';

export const authFeatureKey = 'auth';

export const AUTH_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<AuthState>
>('Auth Reducers');

export function getAuthReducers(): ActionReducerMap<AuthState> {
  return {
    login: loginReducer,
    register: registerReducer,
    socialLogin: socialLoginReducer,
  };
}
