import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';

export interface CallMeResponseModel {
  status: CallMeRecordingStatuses;
  callId: string;
}
