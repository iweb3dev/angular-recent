import { InjectionToken } from '@angular/core';
import { Action, ActionReducerMap, createReducer, on } from '@ngrx/store';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';
import { VoiceStateModel } from '../voice-message.models';
import {
  closeMicrophoneRecordDialog,
  openCallInDialog,
  openMicrophoneDialog,
  setCallInId,
  setCallMeRecordingStatus,
  setFileUploadedMessage,
  setMicrophonePlayBack,
  setPhoneTTSMessage,
  setTtsPlayBack,
  setUploadPlayBack,
  stopMicrophoneRecording,
  toggleIsRecordingTimer,
  togglePauseResume,
} from './voice.actions';

export const voiceReducerInitialState: VoiceStateModel = {
  messageSource: null,
  callMeRecordingStatus: CallMeRecordingStatuses.Initial,
  playBackFile: null,
  isTTSCompleted: true,
  isMicrophoneRecording: false,
  isPaused: false,
  microphoneDialogClosed: false,
  phoneMicrophoneMessage: {
    id: null,
    size: null,
    fileName: null,
    fileExtension: null,
  },
  phoneUploadedMessage: {
    id: null,
    size: null,
    fileName: null,
    fileExtension: null,
  },
  phoneTTSMessage: null,
  callMeFileLocation: null,
};

const reducer = createReducer(
  voiceReducerInitialState,
  on(toggleIsRecordingTimer, (state, action) => ({
    ...state,
    isMicrophoneRecording: action.isMicrophoneRecording,
    isPaused: !action.isMicrophoneRecording,
  })),
  on(togglePauseResume, (state, action) => ({
    ...state,
    isPaused: action.isPaused,
  })),
  on(setMicrophonePlayBack, setUploadPlayBack, setTtsPlayBack, (state, action) => {
    return {
      ...state,
      isTTSCompleted: Boolean(action.fileUrl),
      playBackFile: action.fileUrl,
    };
  }),
  on(stopMicrophoneRecording, (state) => ({
    ...state,
    isMicrophoneRecording: false,
    isPaused: false,
  })),
  on(setFileUploadedMessage, (state, action) => ({
    ...state,
    ...action,
  })),
  on(setCallMeRecordingStatus, (state, action) => ({
    ...state,
    callMeRecordingStatus: action.status,
  })),
  on(openMicrophoneDialog, (state) => ({
    ...state,
    microphoneDialogClosed: false,
  })),
  on(closeMicrophoneRecordDialog, (state, action) => ({
    ...state,
    microphoneDialogClosed: action.closed,
  })),
  on(openCallInDialog, (state) => ({
    ...state,
    callMeRecordingStatus: CallMeRecordingStatuses.Initial,
  })),
  on(setPhoneTTSMessage, (state, action) => ({
    ...state,
    phoneTTSMessage: action.message,
  })),
  on(setCallInId, (state, action) => ({
    ...state,
    callMeFileLocation: `${action.id}.wav`,
  }))
  //  on(resetCreateMessageState, (state, action) => voiceReducerInitialState), // TODO: figure out how to properly reset state here
);

function voiceReducer(state: VoiceStateModel, action: Action): VoiceStateModel {
  return reducer(state, action);
}

export const voiceMessageFeatureKey = 'voiceMessage';

export const VOICE_MESSAGE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<{ voiceState: VoiceStateModel }>>('Voice Message Reducer');

export function voiceMessageReducerFactory(): ActionReducerMap<{
  voiceState: VoiceStateModel;
}> {
  return {
    voiceState: voiceReducer,
  };
}
