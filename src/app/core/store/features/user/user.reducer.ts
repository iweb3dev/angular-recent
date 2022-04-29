import { createReducer, on } from '@ngrx/store';
import { USER_AVATAR_PLACEHOLDER } from 'src/app/shared/constants/global-user-avatar.const';

import * as UserAction from './user.actions';
import { UserStateModel } from './user.model';

export const userSlice = 'user';

const initialUserState: UserStateModel = {
  user: null,
  mainUserInfo: null,
};

export const reducer = createReducer(
  initialUserState,
  on(UserAction.setUser, (state, action) => ({ ...state, user: action.user })),

  on(UserAction.setMainUserInfo, (state, action) => ({
    ...state,
    mainUserInfo: {
      ...action.data,
    },
  })),
  on(UserAction.saveCallInSettingsResolve, (state, { userDto }) => ({
    ...state,
    mainUserInfo: {
      ...userDto
    }
  }))
);
