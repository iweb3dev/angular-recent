import { Action, createReducer, on } from '@ngrx/store';
import { ConfirmStateModel } from 'src/app/core/store/features/new-message/new-message.models';
import { resetCreateMessageState } from '../new-message.actions';

import {
  setCommunicationQueue,
  setPhoneMessageLength,
  setScheduleOptions,
  setUserSystemSettings,
} from './confirm.actions';

export const initialConfirmState: ConfirmStateModel = {
  queue: null,
  phoneMessageLength: 0,
  scheduleOptions: null,
  userSystemSettings: null,
};

const reducer = createReducer(
  initialConfirmState,
  on(resetCreateMessageState, (state, action) => initialConfirmState),
  on(setPhoneMessageLength, (state, action) => ({
    ...state,
    phoneMessageLength: action.phoneMessageLength,
  })),
  on(setCommunicationQueue, (state, action) => ({
    ...state,
    queue: action.queue,
  })),
  on(setScheduleOptions, (state, action) => ({
    ...state,
    scheduleOptions: action.scheduleOptions,
  })),
  on(setUserSystemSettings, (state, action) => ({
    ...state,
    userSystemSettings: action.settings,
  })),
);

export function confirmReducer(
  state: ConfirmStateModel,
  action: Action,
): ConfirmStateModel {
  return reducer(state, action);
}
