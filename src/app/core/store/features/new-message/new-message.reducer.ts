import { InjectionToken } from '@angular/core';
import { ActionReducerMap, combineReducers } from '@ngrx/store';
import { confirmReducer } from './confirm/confirm.reducer';

import { createMessageReducer } from './create-message/create-message.reducer';
import { NewMessageStateModel } from './new-message.models';

export const newMessageFeatureKey = 'newMessage';

export const NEW_MESSAGE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<NewMessageStateModel>
>('New Message Reducer');

export const reducer = combineReducers({
  messageReducer: createMessageReducer,
  confirmReducer: confirmReducer,
});
