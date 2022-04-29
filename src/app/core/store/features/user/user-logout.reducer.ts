import { INIT } from '@ngrx/store';

import * as UserAction from './user.actions';

export function logout(reducer) {
  return (state, action) => {
    if ( action != null && action.type === UserAction.logout.type) {
      return reducer( undefined, {type: INIT});
    }
    return reducer(state, action);
  };
}
