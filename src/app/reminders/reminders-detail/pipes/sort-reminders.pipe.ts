import { Pipe, PipeTransform } from '@angular/core';
import { CommunicationReminder } from '../../../core/store/features/reminders/reminders.models';

export enum CommunicationReminderSort {
  NewToOld,
  OldToNew
}

@Pipe({ name: 'communicationSortPipe' })
export class CommunicationSortPipe implements PipeTransform {

  transform(value: CommunicationReminder[], order: CommunicationReminderSort): CommunicationReminder[] {

    switch (order) {
      case CommunicationReminderSort.NewToOld:
        return value.sort((a, b) => {
          if (a.insertedDateTime > b.insertedDateTime) {
            return -1;
          }
          return 1;
        });
      case CommunicationReminderSort.OldToNew:
        return value.sort((a, b) => {
          if (a.insertedDateTime > b.insertedDateTime) {
            return 1;
          }
          return -1;
        });
      default:
        return value;
    }
  }
}

