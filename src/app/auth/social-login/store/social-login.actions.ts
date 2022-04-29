import { createAction, props } from '@ngrx/store';

import { ExternalUserInfoModel } from '@api/external-logins/external-login.model';
import {
  SocialProvider,
  SearchSocialUser,
  SocialLoginState,
  RegisterSocialUser,
  SearchSocialUserResponse,
} from './social-login.models';

export const trySearchUser = createAction(
  '[Auth] Try User Search',
  props<SearchSocialUser>()
);

export const searchUser = createAction(
  '[Auth] User Search',
  props<SearchSocialUser>()
);

export const searchUserSuccess = createAction(
  '[Auth] Search User Success',
  props<{ socialUser: SearchSocialUserResponse }>()
);

export const searchUserFailure = createAction('[Auth] Search User Failure');

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ registerSocialUser: RegisterSocialUser }>()
);

export const registerUserSuccess = createAction(
  '[Auth] Register User Success',
  props<{ registeredSocialUser: boolean }>()
);

export const registerUserFailure = createAction('[Auth] Register User Failure');

export const tryRemoveUser = createAction(
  '[Auth] Try Remove User',
  props<SocialProvider>()
);

export const removeUser = createAction(
  '[Auth] Remove User',
  props<SocialProvider>()
);

export const removeUserSuccess = createAction(
  '[Auth] Remove User Success',
  props<{ removeSocialUser: boolean }>()
);

export const removeUserFailure = createAction('[Auth] Remove User Failure');

export const resetRemoveUser = createAction('[Auth] Reset Remove User');

export const fetchAssociatedAccounts = createAction(
  '[Auth] Fetch Associated Accounts'
);

export const associatedAccountsSuccess = createAction(
  '[Auth] Fetch Associated Accounts Success',
  props<{ associatedAccounts: ExternalUserInfoModel }>()
);

export const associatedAccountsFailure = createAction(
  '[Auth] Fetch Associated Accounts Failure'
);

export const logoutUser = createAction(
  '[Auth] Logout Social User',
  props<{ initialState: SocialLoginState }>()
);
