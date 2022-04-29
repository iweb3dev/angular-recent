import { RepeatOptions } from 'src/app/shared/models/enums/reminder-repeat-options';

export interface CommunicationReminder {
  reminderId: number;
  reminderName: string;
  startDateTime: Date;
  nextReminderDateTime: Date;
  frequency: RepeatOptions;
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
