import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey } from '../../store/auth.reducer';

import { AuthState } from '../../auth.models';

export const selectSocialLoginState =
  createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsSocialUser = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.isSocialUser
);

export const selectSocialUser = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.socialUser
);

export const selectIsNewSocialSignup = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.isNewSocialSignup
);

export const selectSocialUserRegistered = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.socialUserRegistered
);

export const selectSocialUserRemoved = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.socialUserRemoved
);

export const selectAssociatedAccounts = createSelector(
  selectSocialLoginState,
  (state: AuthState) => state.socialLogin.associatedAccounts
);
