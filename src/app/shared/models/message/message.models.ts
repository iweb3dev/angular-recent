import { FileUploadDto, FileUploadModel } from '../file/file-upload.models';

export type DetailsMessageFormDataModel = TextMessageModel & EmailMessageModel & VoiceMessageModel;

export interface MessageModel extends DetailsMessageFormDataModel {
  messageName: string;
  attachments: FileUploadDto[];
}

export interface TextMessageModel {
  sMSFromText: string;
  sMSMessage: string;
  textNumber: string;
  allowedResponses: AllowedResponsesModel[];
  smSTwoWayText: boolean;
  smsAllowedResponseYes?: boolean;
  smsAllowedResponseNo?: boolean;
  smsAllowedResponseMaybe?: boolean;
  smsHidden: boolean;
}

export interface EmailMessageModel {
  emailSubject: string;
  emailFromName: string;
  emailFrom: string;
  replyTo?: string;
  emailJson: string;
  emailBody: string;
  emailHidden: boolean;
}

export interface VoiceMessageModel {
  callerId: string;
  emailAlternateFormatSend: boolean;
  lat: string;
  phoneMessageSource: PhoneMessageSourceTypes;
  svm: boolean;
  textAlternateFormatSend: boolean;
  phoneMicrophoneMessage: FileUploadModel;
  phoneUploadedMessage: FileUploadModel;
  phoneTTSMessage: string;
  phoneTTSMessageSource: string;
  callMeFileLocation: string;
  voiceHidden: boolean;
}

export enum NotificationFormatValues {
  AllMessages = 7,
  VoiceMessage = 1,
  TextMessage = 2,
  EmailMessage = 4,
  VoiceText = 3,
  VoiceEmail = 5,
  TextEmail = 6,
}

export enum PhoneMessageSourceTypes {
  Unknown = 0,
  CallMe = 1,
  TTS = 2,
  Upload = 3,
  CallIn = 4,
  Microphone = 5,
}

export interface SelectedMessagesModel {
  isEmailMessage: boolean;
  isPhoneMessage: boolean;
  isTextMessage: boolean;
}

export enum AllowedResponsesMessages {
  Yes = 'Yes',
  No = 'No',
  Maybe = 'Maybe',
}

export enum AllowedResponsesIds {
  Yes,
  No,
  Maybe,
}

export interface AllowedResponsesModel {
  id: AllowedResponsesIds;
  notificationID: number;
  response: AllowedResponsesMessages;
}
