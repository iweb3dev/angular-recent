import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import {
  createRemindersResolve,
  createRemindersStart,
  deleteAllRemindersStart,
  deleteRemindersStart,
  getAllRemindersStart,
  updateRemindersResolve,
  updateRemindersStart
} from './reminders.actions';
import { CommunicationReminder } from './reminders.models';
import { getAllReminders, getReminderById } from './reminders.selectors';


@Injectable({
  providedIn: 'root'
})
export class RemindersFacade {
  allReminders$ = this._store.select(getAllReminders);

  constructor(private _store: Store<AppState>,
    private _actions$: Actions) {}

  fetchReminders() {
    this._store.dispatch(getAllRemindersStart());
  }

  getReminderById(id: number) {
    return this._store.select(getReminderById)
    .pipe(map(fn => fn(id)));
  }

  createReminder(reminder: CommunicationReminder) {
    this._store.dispatch(createRemindersStart({
      reminder: reminder
    }));
  }

  updateReminder(reminder: CommunicationReminder) {
    this._store.dispatch(updateRemindersStart({
      reminder: reminder
    }));
  }

  deleteReminder(reminder: CommunicationReminder) {
    this._store.dispatch(deleteRemindersStart({
      reminder: reminder
    }));
  }

  deleteAllReminders() {
    this._store.dispatch(deleteAllRemindersStart());
  }

  onUpdateResolve() {
    return this._actions$.pipe(
      take(1),
      ofType(updateRemindersResolve));
  }

  onCreateResolve() {
    return this._actions$.pipe(
      take(1),
      ofType(createRemindersResolve));
  }
}
