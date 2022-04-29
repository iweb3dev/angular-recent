import { ReminderFrequency } from '../shared/shared.enums';

export interface CommunicationReminders {
  reminderId: number;
  reminderName: string;
  startDateTime: Date;
  nextReminderDateTime: Date;
  frequency: ReminderFrequency;
  frequencyDescription: string;
  frequencyDetails: string;
  insertedDateTime: Date;
  userId: number;
  groupId: number;
  groupName: string;
  phoneNumberToCall: string;
  callerId: string;
  isActive: boolean;
}
