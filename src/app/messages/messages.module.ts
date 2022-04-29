import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages.routes';
import {
  messageLibraryFeatureKey,
  messageLibraryReducerFactory,
  MESSAGE_LIBRARY_REDUCER_TOKEN,
} from './state/library,reducer';

import { MessageLibraryFacade } from './state/message-library/message-library.facade';
import { MessageLibraryEffects } from './state/message-library/message-library.effects';

@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    StoreModule.forFeature(
      messageLibraryFeatureKey,
      MESSAGE_LIBRARY_REDUCER_TOKEN,
    ),
    EffectsModule.forFeature([MessageLibraryEffects]),
  ],
  providers: [
    {
      provide: MESSAGE_LIBRARY_REDUCER_TOKEN,
      useFactory: messageLibraryReducerFactory,
    },
    MessageLibraryFacade,
  ],
})
export class MessagesModule {}
