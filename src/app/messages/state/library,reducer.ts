import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import { LibraryStateModel } from '../messages.models';

import { messageLibraryReducer } from './message-library/message-library.reducer';

export const messageLibraryFeatureKey = 'messageLibrary';

export const MESSAGE_LIBRARY_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<LibraryStateModel>
>('Message Library Reducer');

export function messageLibraryReducerFactory(): ActionReducerMap<LibraryStateModel> {
  return {
    messageLibraryReducer,
  };
}
