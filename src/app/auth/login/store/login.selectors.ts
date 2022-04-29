import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../auth.models';

import { authFeatureKey } from '../../store/auth.reducer';

export const selectLoginState = createFeatureSelector<AuthState>(
  authFeatureKey,
);

export const selectFormValidity = createSelector(
  selectLoginState,
  (state: AuthState) => state.login.formValidity,
);

export const selectIsLoggingIn = createSelector(
  selectLoginState,
  (state: AuthState) => state.login.isLoggingIn,
);
