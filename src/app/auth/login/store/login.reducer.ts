import { Action, createReducer, on } from '@ngrx/store';
import { LoginErrors, LoginState } from '../login.models';

import { logIn, loginFailure, logInSuccess } from './login.actions';

export const loginInitState: LoginState = {
  formValidity: LoginErrors.NoError,
  isLoggingIn: false,
};

const reducer = createReducer(
  loginInitState,

  on(logIn, (state) => ({
    ...state,
    formValidity: LoginErrors.NoError,
    isLoggingIn: true,
  })),

  on(logInSuccess, (state) => ({
    ...state,
    formValidity: LoginErrors.NoError,
    isLoggingIn: false,
  })),

  on(loginFailure, (state, action) => {
    return {
      ...state,
      formValidity: action.formValidity,
      isLoggingIn: false,
    };
  }),
);

export function loginReducer(state: LoginState, action: Action): LoginState {
  return reducer(state, action);
}
