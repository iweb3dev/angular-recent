import {
  MessageModel,
  NotificationFormatValues,
  PhoneMessageSourceTypes,
  SelectedMessagesModel,
} from 'src/app/shared/models/message/message.models';

export interface CallMePayload {
  phoneNumber: string;
  extension?: string;
  userID: number;
}

export interface MessagePayloadModelDto extends SelectedMessagesModel {
  message: MessageModelDto;
}

export interface MessageModelDto extends MessageModel {
  memberID: number;
}

export interface MessagesResponseDto {
  pageNumber: number;
  pageSize: number;
  pagedObjects: MessagePagedObjectsDto[];
  totalPages: number;
  totalRecords: number;
}

export interface MessagePagedObjectsDto {
  acceptResponses: boolean;
  classification: number; // TODO: find out if enum
  dateLastSent: string;
  fileName: string;
  groupsLastSentTo: string;
  id: number;
  notificationFormatValue: NotificationFormatValues;
  notificationName: string;
  smsChargeLength: number;
  textNumber: string;
  modifiedByDateTime: Date;
}

export interface MessageDetailsResponseDto {
  acceptResponses: boolean;
  acceptedResponseList: any; // TODO : figure out model for this
  callerId: string;
  coverPageComments: string;
  emailAlternateFormatSend: boolean;
  emailBody: string;
  emailJson: string;
  emailSubject: string;
  fromAddress: string;
  fromEmailName: string;
  fromName: string;
  fromPhoneNumber: string;
  hasCoverPage: boolean;
  hidden: boolean;
  id: number;
  lat: string;
  nfA_Notification_ID: number;
  notificationFormatValue: NotificationFormatValues;
  notificationName: string;
  pageCount: number;
  replyTo: string;
  smsChargeLength: number;
  smsFromText: string;
  smsText: string;
  smsToText: string;
  svm: boolean;
  textAlternateFormatSend: boolean;
  textNumber: string;
  smSTwoWayText: boolean;
  ttsMessage: string;
}

export interface MessageFilesResponseDto {
  fileName: string;
  localFilePath: string;
  fileType: number; // TODO: some type of enum
  id: number;
  isHistory: boolean;
  notificationFormatID: NotificationFormatValues;
  notificationID: NotificationFormatValues;
  phoneFileType: number; // some enum
  sourceType: PhoneMessageSourceTypes;
  pagedObjects?: FilesPagedObject[];
}

export interface FilesPagedObject {
  fileName: string;
  fileType: number; // TODO: figure out enum
  flaggedForDeletion: boolean;
  id: number;
  notificationFormatID: number;
  notificationID: number;
  sourceType: number; // not  PhoneMessageSourceTypes in case of email attachments
}

export interface ChangeNotificationTypeDtoModel {
  changeSelectedNotificationTypes: boolean;
  id: number;
  messageName: string;
  userSelectedNotificationTypes: NotificationFormatValues;
}
