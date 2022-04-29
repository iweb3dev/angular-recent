import { NotificationStatusTypes } from '../enums/notification-status';

export class Communication {
  notificationName: string;
  notificationStatus: NotificationStatusTypes;
  endDateTime: string;

  constructor(obj: Partial<Communication>) {
    Object.assign(this, obj);
  }
}
