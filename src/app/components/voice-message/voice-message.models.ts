import { PhoneMessageSourceTypes } from './../../shared/models/message/message.models';
import { FileUploadModel } from 'src/app/shared/models/file/file-upload.models';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';

export interface VoiceStateModel {
  messageSource: PhoneMessageSourceTypes;
  callMeRecordingStatus: CallMeRecordingStatuses;
  playBackFile: string;
  isTTSCompleted: boolean;
  isMicrophoneRecording: boolean;
  isPaused: boolean;
  microphoneDialogClosed: boolean;
  phoneMicrophoneMessage: FileUploadModel;
  phoneUploadedMessage: FileUploadModel;
  phoneTTSMessage: string;
  callMeFileLocation: string;
}
