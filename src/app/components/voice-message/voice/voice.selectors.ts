import { createFeatureSelector, createSelector } from '@ngrx/store';

import { VoiceStateModel } from '../voice-message.models';
import { voiceMessageFeatureKey } from './voice.reducer';

export const selectVoiceMessage = createFeatureSelector<{
  voiceState: VoiceStateModel;
}>(voiceMessageFeatureKey);

export const selectRecordingState = createSelector(selectVoiceMessage, (state) => ({
  isMicrophoneRecording: state.voiceState.isMicrophoneRecording,
  isPaused: state.voiceState.isPaused,
}));

export const selectPlayBackFile = createSelector(selectVoiceMessage, (state) => state.voiceState.playBackFile);

export const selectCallMeRecordingStatus = createSelector(selectVoiceMessage, (state) => state.voiceState.callMeRecordingStatus);

export const selectMicrophoneDialogClosed = createSelector(selectVoiceMessage, (state) => state.voiceState.microphoneDialogClosed);

export const selectTtsMessage = createSelector(selectVoiceMessage, (state) => state.voiceState.phoneTTSMessage);

export const selectIsTTSCompeted = createSelector(selectVoiceMessage, (state) => state.voiceState.isTTSCompleted);

export const selectEditedMessageSource = createSelector(selectVoiceMessage, (state) => state.voiceState.messageSource);

export const selectPhoneMicrophoneMessage = createSelector(selectVoiceMessage, (state) => state.voiceState.phoneMicrophoneMessage);

export const selectPhoneUploadedMessage = createSelector(selectVoiceMessage, (state) => state.voiceState.phoneUploadedMessage);

export const selectCallInFileLocation = createSelector(selectVoiceMessage, (state) => state.voiceState.callMeFileLocation);
