import { FilesPagedObject } from './../../api/messages/messages.models';

export interface EmailPreviewDataModel {
  creationDate: string;
  notificationName: string;
  callerId: string;
  from: string;
  subject: string;
  replyTo: string;
  emailBody: string;
  emailJson: string;
  showActions: boolean;
  attachments: FilesPagedObject[];
}
