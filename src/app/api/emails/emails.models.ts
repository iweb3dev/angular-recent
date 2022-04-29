export interface SystemEmail {
  toAddress: string;
  fromAddress: string;
  replyToAddress: string;
  subject: string;
  body: string;
  groupId: number;
  notificationId: number;
  emailType?: number;
}
