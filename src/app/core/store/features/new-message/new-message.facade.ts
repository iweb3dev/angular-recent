import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { MessageNameModel } from 'src/app/components/message-name/message-name.models';
import { MessageModel } from 'src/app/shared/models/message/message.models';

import {
  emailMessageFormatChange,
  openPreviousMessage,
  resetCreateMessageState,
  setCreateMessageName,
  setPlayBackAudio,
  setPreviousMessage,
  textMessageFormatChange,
  updateCommunicationQueue,
  updateMessage,
  voiceMessageFormatChange,
} from './new-message.actions';
import { NewMessageStateModel } from './new-message.models';
import { selectMessage, selectAudioRecordingUrl } from './new-message.selectors';

@Injectable({ providedIn: 'root' })
export class NewMessageFacade {
  messageState$ = this._store.select(selectMessage);
  audioRecordingUrl$ = this._store.select(selectAudioRecordingUrl);

  constructor(private _store: Store<NewMessageStateModel>) {}

  resetMessageState(): void {
    this._store.dispatch(resetCreateMessageState());
  }

  patchMessage(updateParams: Partial<MessageModel>): void {
    this._store.dispatch(updateMessage({ updateParams }));
  }

  saveMessageNameFormData(data: MessageNameModel): void {
    this._store.dispatch(setCreateMessageName({ data }));
  }

  emailFormatChange(): void {
    this._store.dispatch(emailMessageFormatChange());
  }

  voiceFormatChange(): void {
    this._store.dispatch(voiceMessageFormatChange());
  }

  textFormatChange(): void {
    this._store.dispatch(textMessageFormatChange());
  }

  setPlayBackFilePath(fileUrl: string): void {
    this._store.dispatch(setPlayBackAudio({ fileUrl }));
  }

  updateCommunicationQueue(): void {
    this._store.dispatch(updateCommunicationQueue());
  }

  openPreviousMessage(id: number, isIncludeTextMessage: boolean): void {
    this._store.dispatch(openPreviousMessage({ id, isIncludeTextMessage }));
  }

  setPreviousMessage(id: number): void {
    this._store.dispatch(setPreviousMessage({ id }));
  }
}
