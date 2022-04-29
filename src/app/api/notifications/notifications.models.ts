export interface BaseUserNotification {
  recipientsID: number;
  sendersID: number;
  notification: string;
  notificationLookupID: number;
  userResponseRequired: boolean;
  groupId: number;
  importResultsId: number;
}

export interface UserNotification extends BaseUserNotification {
  id: number;
  viewed: boolean;
  viewedDateTime: Date;
  userResponseValue: string;
  insertedDateTime: Date;
}
