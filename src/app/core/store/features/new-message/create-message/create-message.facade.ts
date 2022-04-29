import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import { submitNewMessage } from '../new-message.actions';
import { NewMessageStateModel } from '../new-message.models';
import {
  createMessageRecordFromLibrary,
  deleteEmailAttachment,
  emailPanelOpen,
  fetchEmailAttachment,
  openEmailPreview,
  openTextPreview,
  openVoicePreview,
  resetStore,
  saveAndContinue,
  saveAndContinueWithPreviousMessage,
  saveMessageInLibrary,
  setEmailAttachment,
  setEmailValid,
  setMessageCreation,
  setNameValid,
  setTextValid,
  setVoiceValid,
  textPanelOpen,
  voicePanelOpen,
} from './create-message.actions';
import {
  selectAudioRecording,
  selectCreateMessageId,
  selectCreateMessageState,
  selectEmailData,
  selectEmailPanelOpen,
  selectEmailPreview,
  selectEmailStateValid,
  selectFormats,
  selectIsPreviousMessage,
  selectMessageCreated,
  selectMessageDetails,
  selectMessageNameValid,
  selectMessageStateValid,
  selectName,
  selectRecipients,
  selectTextData,
  selectTextPanelOpen,
  selectTextPreview,
  selectTextStateValid,
  selectVoiceData,
  selectVoicePanelOpen,
  selectVoicePreview,
  selectVoiceStateValid,
} from './create-message.selectors';

@Injectable({ providedIn: 'root' })
export class CreateMessageFacade {
  isPreviousMessage$ = this._store.select(selectIsPreviousMessage);
  messageName$ = this._store.select(selectName);
  messageFormats$ = this._store.select(selectFormats);
  textValid$ = this._store.select(selectTextStateValid);
  textMessageData$ = this._store.select(selectTextData);
  messageId$ = this._store.select(selectCreateMessageId);
  emailValid$ = this._store.select(selectEmailStateValid);
  message$ = this._store.select(selectCreateMessageState);
  emailMessageData$ = this._store.select(selectEmailData);
  voiceMessageData$ = this._store.select(selectVoiceData);
  voiceValid$ = this._store.select(selectVoiceStateValid);
  textPreviewData$ = this._store.select(selectTextPreview);
  messageRecipients$ = this._store.select(selectRecipients);
  voicePreviewData$ = this._store.select(selectVoicePreview);
  emailPreviewData$ = this._store.select(selectEmailPreview);
  messageNameData$ = this._store.select(selectMessageDetails);
  messageNameValid$ = this._store.select(selectMessageNameValid);
  messageValid$ = this._store.select(selectMessageStateValid);
  audioRecordingUrl$ = this._store.select(selectAudioRecording);
  messageCreated$ = this._store.select(selectMessageCreated);
  voicePanelOpen$ = this._store.select(selectVoicePanelOpen);
  textPanelOpen$ = this._store.select(selectTextPanelOpen);
  emailPanelOpen$ = this._store.select(selectEmailPanelOpen);

  constructor(private _store: Store<NewMessageStateModel>) {}

  resetStore() {
    this._store.dispatch(resetStore());
  }

  uploadEmailAttachment(file: File): void {
    this._store.dispatch(fetchEmailAttachment({ file }));
  }

  setEmailAttachment(attachment: FileUploadDto): void {
    this._store.dispatch(setEmailAttachment({ attachment }));
  }

  emailAttachmentsRemove(fileIndex: number): void {
    this._store.dispatch(deleteEmailAttachment({ fileIndex }));
  }

  openVoiceMessagePreview(): void {
    this._store.dispatch(openVoicePreview());
  }

  openTextMessagePreview(): void {
    this._store.dispatch(openTextPreview());
  }

  openEmailMessagePreview(): void {
    this._store.dispatch(openEmailPreview());
  }

  setVoiceFormValid(valid: boolean) {
    this._store.dispatch(setVoiceValid({ valid }));
  }

  setTextFormValid(valid: boolean) {
    this._store.dispatch(setTextValid({ valid }));
  }

  setEmailFormValid(valid: boolean) {
    this._store.dispatch(setEmailValid({ valid }));
  }

  setNameValid(valid: boolean) {
    this._store.dispatch(setNameValid({ valid }));
  }

  saveAndContinue(createCommunication: { createCommunication: boolean }) {
    this._store.dispatch(saveAndContinue(createCommunication));
  }

  submitNewMessage(payload: {
    createCommunication: boolean;
    messageId?: number;
  }): void {
    this._store.dispatch(submitNewMessage(payload));
  }

  saveAndContinueWithPreviousMessage(messageId: { messageId: number }) {
    this._store.dispatch(saveAndContinueWithPreviousMessage(messageId));
  }

  saveMessageInLibrary() {
    this._store.dispatch(saveMessageInLibrary());
  }

  setMessageCreationState(state: boolean) {
    this._store.dispatch(setMessageCreation({ messageCreated: state }));
  }

  voicePanelOpen(open: boolean): void {
    this._store.dispatch(voicePanelOpen({ open }));
  }

  textPanelOpen(open: boolean): void {
    this._store.dispatch(textPanelOpen({ open }));
  }

  emailPanelOpen(open: boolean): void {
    this._store.dispatch(emailPanelOpen({ open }));
  }

  createMessageFromLibrary(): void {
    this._store.dispatch(createMessageRecordFromLibrary());
  }
}
