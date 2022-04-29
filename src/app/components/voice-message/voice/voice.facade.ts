import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhoneMessageSourceTypes } from 'src/app/shared/models/message/message.models';
import { VoiceStateModel } from '../voice-message.models';
import {
  cancelCallIn,
  initiateCallIn,
  initiateRecording,
  openVoiceDialog,
  phoneNumberVerify,
  setIsTTSCompleted,
  stopMicrophoneRecording,
  togglePauseResume,
} from './voice.actions';
import {
  selectCallInFileLocation,
  selectCallMeRecordingStatus,
  selectEditedMessageSource,
  selectIsTTSCompeted,
  selectMicrophoneDialogClosed,
  selectPhoneMicrophoneMessage,
  selectPhoneUploadedMessage,
  selectPlayBackFile,
  selectRecordingState,
  selectTtsMessage,
} from './voice.selectors';

@Injectable()
export class VoiceFacade {
  audioRecording$ = this._store.select(selectPlayBackFile);
  recordingState$ = this._store.select(selectRecordingState);
  isTTSCompleted$ = this._store.select(selectIsTTSCompeted);
  callMeRecordingStatus$ = this._store.select(selectCallMeRecordingStatus);
  microphoneDialogClosed$ = this._store.select(selectMicrophoneDialogClosed);
  isEdit$ = this._store.select(selectMicrophoneDialogClosed);
  ttsMessage$ = this._store.select(selectTtsMessage);
  phoneMessageSourceEdited$ = this._store.select(selectEditedMessageSource);
  phoneMicrophoneMessage$ = this._store.select(selectPhoneMicrophoneMessage);
  phoneUploadedMessage$ = this._store.select(selectPhoneUploadedMessage);
  callInFileLocation$ = this._store.select(selectCallInFileLocation);

  constructor(
    private _store: Store<{
      voiceState: VoiceStateModel;
    }>
  ) {}

  initiateRecording(): void {
    this._store.dispatch(initiateRecording());
  }

  setIsTTSCompleted(isTTSCompleted: boolean): void {
    this._store.dispatch(setIsTTSCompleted({ isTTSCompleted }));
  }

  recordingPauseResume(isPaused: { isPaused: boolean }): void {
    this._store.dispatch(togglePauseResume(isPaused));
  }

  recordingStop(): void {
    this._store.dispatch(stopMicrophoneRecording());
  }

  openVoiceDialog(data: {
    messageSource: PhoneMessageSourceTypes;
    mobileView: boolean;
    injectorData?: any;
  }) {
    this._store.dispatch(openVoiceDialog(data));
  }

  initiateCallIn(phoneNumberDetails: any): void {
    this._store.dispatch(initiateCallIn({ phoneNumberDetails }));
  }

  cancelCallIn(): void {
    this._store.dispatch(cancelCallIn());
  }

  verifyPhoneNumber(): void {
    this._store.dispatch(phoneNumberVerify());
  }
}
