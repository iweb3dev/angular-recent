import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/api/users/users.models';
import { MainUserInfoModel } from './user.model';

export const fetchUser = createAction('[User] Fetch User');
export const setUser = createAction(
  '[User] Set User',
  props<{ user: UserModel }>(),
);
export const setMainUserInfo = createAction(
  '[User] Main Data',
  props<{ data: MainUserInfoModel }>(),
);

export const saveUserProfileStart = createAction(
  '[User] Save Profile Start', props<{ userDto: MainUserInfoModel }>()
);
export const saveUserProfileResolve = createAction(
  '[User] Save Profile Resolve', props<{ userDto: MainUserInfoModel }>()
);
export const saveUserProfileError = createAction(
  '[User] Save Profile Error'
);

export const saveCallInSettingsStart = createAction(
  '[User] Save Call In Settings Start', props<{ userDto: MainUserInfoModel }>()
);
export const saveCallInSettingsResolve = createAction(
  '[User] Save Call In Settings Resolve', props<{ userDto: MainUserInfoModel }>()
);
export const saveCallInSettingsError = createAction(
  '[User] Save Call In Settings Error'
);

export const logout = createAction(
  '[User] logout request'
);
