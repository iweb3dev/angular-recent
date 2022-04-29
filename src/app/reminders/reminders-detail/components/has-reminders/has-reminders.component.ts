import { Component } from '@angular/core';
import { RemindersFacade } from 'src/app/core/store/features/reminders/reminders.facade';
import { CommunicationReminder } from 'src/app/core/store/features/reminders/reminders.models';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { RepeatOptions } from 'src/app/shared/models/enums/reminder-repeat-options';
import { CommunicationReminderSort } from '../../pipes/sort-reminders.pipe';

@Component({
  selector: 'app-has-reminders',
  templateUrl: './has-reminders.component.html',
  styleUrls: ['./has-reminders.component.scss']
})
export class HasRemindersComponent {
  allReminders$ = this._remindersFacade.allReminders$;
  sortOptions = Object.keys(CommunicationReminderSort)
  .filter(s => !isNaN(+s))
  .reduce((a, b) => {
    a[b] = CommunicationReminderSort[b].replace(/([A-Z])/g, ' $1').trim();
    return a;
  }, {});
  sortConfig = CommunicationReminderSort.NewToOld;
  repeatOptions = RepeatOptions;

  constructor(private _remindersFacade: RemindersFacade,
    private _confirmDialogService: ConfirmDialogService) {}

  onSelectSort(opt: CommunicationReminderSort) {
    this.sortConfig = +opt;
  }

  onDelete(reminder: CommunicationReminder) {
    this._confirmDialogService.showDialog({
      confirmBtn: 'Yes, delete',
      header: `Delete reminder: ${reminder.reminderName}`,
      detail: `Are you sure you want to delete reminder: ${reminder.reminderName}?`
    }).subscribe(res => res && this._remindersFacade.deleteReminder(reminder));
  }

  onDeleteAll() {
    this._confirmDialogService.showDialog({
      confirmBtn: 'Yes, delete',
      header: `Delete all reminders`,
      detail: `Are you sure you want to delete all reminders?`
    }).subscribe(res => res && this._remindersFacade.deleteAllReminders());
  }
}
