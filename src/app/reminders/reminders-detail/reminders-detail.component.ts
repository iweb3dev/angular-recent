import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { RemindersFacade } from 'src/app/core/store/features/reminders/reminders.facade';

@Component({
  selector: 'app-reminders-detail',
  templateUrl: './reminders-detail.component.html',
  styleUrls: ['./reminders-detail.component.scss'],
})
export class RemindersDetailComponent {
  title = 'ptest';
  hasReminders$ = this._remindersFacade.allReminders$
  .pipe(map(s => !!s.length));

  constructor(private _remindersFacade: RemindersFacade) {}
}
