import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

export interface MessageNameModel {
  messageName: string;
  messageRecipients?: MessageRecipientsModel[];
  notificationFormatValue?: NotificationFormatValues;
}

export interface MessageRecipientsModel {
  value: string;
  id: number;
}

export enum ValidEndpoints {
  ValidEndpoints = 'ValidEndpoints',
}
