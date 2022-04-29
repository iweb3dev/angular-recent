import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';
import { ResponseUserSystemSettings } from 'src/app/api/users/users.models';
import { MessageRecipientsModel } from 'src/app/components/message-name/message-name.models';
import { ScheduleOptionsModel } from 'src/app/new-communication/communication-details/message-confirm/message-confirm.models';
import { MessageModel, NotificationFormatValues } from 'src/app/shared/models/message/message.models';

export interface NewMessageStateModel {
  messageReducer: MessageStateModel;
  confirmReducer: ConfirmStateModel;
}

export interface ConfirmStateModel {
  queue: BuildCommuniationsQueue;
  phoneMessageLength: number;
  scheduleOptions: ScheduleOptionsModel;
  userSystemSettings: ResponseUserSystemSettings[];
}

export interface DetailsStateModel {
  voiceMessagePanelOpen: boolean;
  textMessagePanelOpen: boolean;
  emailMessagePanelOpen: boolean;
  emailMessageValid: boolean;
  textMessageValid: boolean;
  voiceMessageValid: boolean;
}

export interface MessageStateModel {
  messageId: number;
  audioRecordingUrl?: string;
  textValid: boolean;
  emailValid: boolean;
  isPreviousMessage: boolean;
  voiceValid: boolean;
  nameValid: boolean;
  notificationFormatValue: NotificationFormatValues;
  message: MessageModel;
  messageRecipients: MessageRecipientsModel[];
  messageCreated: boolean;
  voicePanelOpen: boolean;
  textPanelOpen: boolean;
  emailPanelOpen: boolean;
}
