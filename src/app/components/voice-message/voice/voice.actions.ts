import { createAction, props } from '@ngrx/store';

import { FileUploadModel } from 'src/app/shared/models/file/file-upload.models';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';
import { PhoneMessageSourceTypes } from 'src/app/shared/models/message/message.models';

export const stopMicrophoneRecording = createAction(
  '[Voice Message] Stop Microphone Record'
);

export const initiateRecording = createAction(
  '[Voice Message] Initiate Recording'
);

export const startMicrophoneRecording = createAction(
  '[Voice Action] Microphone start recording',
  props<{ stream: MediaStream }>()
);

export const setIsTTSCompleted = createAction(
  '[Voice Message] Set is TTS completed',
  props<{ isTTSCompleted: boolean }>()
);

export const toggleIsRecordingTimer = createAction(
  '[Voice Message] Toggle mic recording timer',
  props<{ isMicrophoneRecording: boolean }>()
);

export const togglePauseResume = createAction(
  '[Voice Message] TogglePauseResume',
  props<{ isPaused: boolean }>()
);

export const setMicrophonePlayBack = createAction(
  '[Voice Message] Create Microphone Audio Playback',
  props<{ blob: Blob; fileUrl: string }>()
);

export const setTtsPlayBack = createAction(
  '[Voice Message] Set TTS Audio Playback',
  props<{ fileUrl: string }>()
);

export const setUploadPlayBack = createAction(
  '[Voice Message] Create Uploaded File Playback',
  props<{ blob: File; fileUrl: string }>()
);

export const setFileUploadedMessage = createAction(
  '[Voice Actions] Set File Uploaded Message',
  props<{
    messageSource: PhoneMessageSourceTypes;
    phoneMicrophoneMessage: FileUploadModel;
    phoneUploadedMessage: FileUploadModel;
  }>()
);

export const setPhoneTTSMessage = createAction(
  '[Voice Actions] Set Phone TTS Message',
  props<{ message: string }>()
);

export const initiateCallIn = createAction(
  '[Voice Actions] Initiate Call In',
  props<{ phoneNumberDetails: any }>()
);

export const setCallInId = createAction(
  '[Voice Actions] Set Call In Id',
  props<{ id: string }>()
);

export const setCallMeRecordingStatus = createAction(
  '[Voice Actions] Set Call Me Recording Status',
  props<{ status: CallMeRecordingStatuses }>()
);

export const openVoiceDialog = createAction(
  '[Voice Actions] Open dialog/bottom sheet',
  props<{
    messageSource: PhoneMessageSourceTypes;
    mobileView: boolean;
    injectorData?: any;
  }>()
);

export const openMicrophoneDialog = createAction(
  '[Voice Actions] Open Microphone Dialog/Sheet',
  props<{ mobileView: boolean }>()
);

export const openFilaUploadDialog = createAction(
  '[Voice Actions] Open File Upload Dialog/Sheet',
  props<{ mobileView: boolean }>()
);

export const openCallInDialog = createAction(
  '[Voice Actions] Open Call Me Dialog/Sheet',
  props<{ mobileView: boolean }>()
);

export const openTTSDialog = createAction(
  '[Voice Actions] Open TTS Me Dialog/Sheet',
  props<{ mobileView: boolean; injectorData: any }>()
);

export const closeMicrophoneRecordDialog = createAction(
  '[Voice Actions] Close Microphone Dialog',
  props<{ closed: boolean }>()
);

export const cancelCallIn = createAction('[Voice Actions] Cancel Call In');

export const phoneNumberVerify = createAction(
  '[Voice Actions] Verify Phone Number'
);
