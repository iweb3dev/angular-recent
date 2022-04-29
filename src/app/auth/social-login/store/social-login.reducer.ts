import { Action, createReducer, on } from '@ngrx/store';

import {
  logoutUser,
  resetRemoveUser,
  searchUserSuccess,
  searchUserFailure,
  removeUserSuccess,
  removeUserFailure,
  registerUserSuccess,
  registerUserFailure,
  associatedAccountsSuccess,
  associatedAccountsFailure,
} from './social-login.actions';

import { SocialLoginState } from './social-login.models';

import { hasValue } from '@shared/utils/verifications/value-check';

export const socialLoginInitialState: SocialLoginState = {
  isSocialUser: false,
  socialUser: undefined,
  isNewSocialSignup: false,
  socialUserRemoved: false,
  socialUserRegistered: false,
  associatedAccounts: undefined,
};

const reducer = createReducer(
  socialLoginInitialState,

  on(searchUserSuccess, (state, { socialUser }) => ({
    ...state,
    socialUser: socialUser,
    isSocialUser: hasValue(socialUser) ? true : false,
    isNewSocialSignup: hasValue(socialUser) ? false : true,
  })),
  on(searchUserFailure, (state) => ({
    ...state,
    socialUser: null,
    isSocialUser: false,
    isNewSocialSignup: false,
  })),

  on(registerUserSuccess, (state, { registeredSocialUser }) => ({
    ...state,
    isNewSocialSignup: false,
    isSocialUser: registeredSocialUser ? true : false,
    socialUserRegistered: registeredSocialUser ? true : false,
  })),
  on(registerUserFailure, (state) => ({
    ...state,
    isSocialUser: false,
    isNewSocialSignup: false,
    socialUserRegistered: false,
  })),

  on(removeUserSuccess, (state, { removeSocialUser }) => ({
    ...state,
    socialUser: null,
    isSocialUser: false,
    isNewSocialSignup: false,
    associatedAccounts: null,
    socialUserRegistered: false,
    socialUserRemoved: removeSocialUser ? true : false,
  })),
  on(removeUserFailure, (state) => ({
    ...state,
    socialUserRemoved: false,
  })),
  on(resetRemoveUser, (state) => ({
    ...state,
    socialUserRemoved: false,
  })),

  on(associatedAccountsSuccess, (state, { associatedAccounts }) => ({
    ...state,
    associatedAccounts: associatedAccounts,
  })),
  on(associatedAccountsFailure, (state) => ({
    ...state,
    associatedAccounts: null,
  })),

  on(logoutUser, (state, { initialState }) => ({
    ...state,
    socialUser: initialState.socialUser,
    isSocialUser: initialState.isSocialUser,
    isNewSocialSignup: initialState.isNewSocialSignup,
    associatedAccounts: initialState.associatedAccounts,
    socialUserRemoved: initialState.socialUserRegistered,
    socialUserRegistered: initialState.socialUserRegistered,
  }))
);

export function socialLoginReducer(
  state: SocialLoginState,
  action: Action
): SocialLoginState {
  return reducer(state, action);
}
