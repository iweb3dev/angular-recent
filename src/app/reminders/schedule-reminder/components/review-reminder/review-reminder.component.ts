import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CommunicationReminder } from 'src/app/core/store/features/reminders/reminders.models';
import { RepeatOptions } from 'src/app/shared/models/enums/reminder-repeat-options';

@Component({
  selector: 'app-review-reminder',
  templateUrl: './review-reminder.component.html',
  styleUrls: ['./review-reminder.component.scss']
})
export class ReviewReminderComponent {
  repeatOptions = RepeatOptions;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { reminder:  CommunicationReminder & { groupName: string },
   next: Subject<boolean>, close: Subject<boolean> }) {}

  onClose() {
    this.data.next.next(false);
  }

  onConfirm() {
    this.data.next.next(true);
  }
}

