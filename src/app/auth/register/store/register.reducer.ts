import { Action, createReducer } from '@ngrx/store';
import { RegisterState } from '../register.models';

export const loginInitState: RegisterState = {};

const reducer = createReducer(loginInitState);

export function registerReducer(
  state: RegisterState,
  action: Action,
): RegisterState {
  return reducer(state, action);
}
