import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterState {
  router: fromRouter.RouterReducerState<any>;
}

export const reducers: ActionReducerMap<RouterState> = {
  router: fromRouter.routerReducer,
};
