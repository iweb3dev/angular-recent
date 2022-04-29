import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { CommunicationReminders } from 'src/app/api/reminders/reminders.models';
import { RemindersService } from 'src/app/api/reminders/reminders.service';
import { ReminderFrequency } from 'src/app/api/shared/shared.enums';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { RepeatOptions } from 'src/app/shared/models/enums/reminder-repeat-options';
import {
  createRemindersError,
  createRemindersResolve,
  createRemindersStart,
  deleteAllRemindersResolve,
  deleteAllRemindersStart,
  deleteRemindersError,
  deleteRemindersResolve,
  deleteRemindersStart,
  getAllRemindersError,
  getAllRemindersResolve,
  getAllRemindersStart,
  updateRemindersError,
  updateRemindersResolve,
  updateRemindersStart
} from './reminders.actions';
import { CommunicationReminder } from './reminders.models';


@Injectable({
  providedIn: 'root'
})
export class RemindersEffects {

  getAllNotifications$ = createEffect(() => this._actions$.pipe(
    ofType(getAllRemindersStart),
    switchMap(() => this._remindersService.getUserReminders(50, 0)
      .pipe(
        switchMap(({ pagedObjects }) => {
        return [getAllRemindersResolve({ reminders: pagedObjects.map(s => ({
          ...s,
          frequency: RepeatOptions[RepeatOptions[s.frequency]]
        }) as CommunicationReminder) })];
      }),
      catchError(() => of(getAllRemindersError()))))
  ));

  updateReminderStart$ = createEffect(() => this._actions$.pipe(
    ofType(updateRemindersStart),
    switchMap(({ reminder }) => this._remindersService.addUpdateReminder({
      ...reminder,
      frequency: ReminderFrequency[ReminderFrequency[reminder.frequency]]
    } as CommunicationReminders)
    .pipe(
      switchMap(() => [updateRemindersResolve({
        reminder: reminder
      })]),
      catchError(() => of(updateRemindersError({ reminder: reminder })))
    ))
  ));

  updateReminderResolve$ = createEffect(() => this._actions$.pipe(
    ofType(updateRemindersResolve),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Success, `Successfully updated reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  updateReminderError$ = createEffect(() => this._actions$.pipe(
    ofType(updateRemindersError),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Error, `Failed updating reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  deleteReminderStart$ = createEffect(() => this._actions$.pipe(
    ofType(deleteRemindersStart),
    switchMap(({ reminder }) => this._remindersService.deleteSpecificReminder(reminder.reminderId)
    .pipe(
      switchMap(() => [deleteRemindersResolve({
        reminder: reminder
      })]),
      catchError(() => of(deleteRemindersError({ reminder: reminder })))
    ))
  ));

  deleteReminderResolve$ = createEffect(() => this._actions$.pipe(
    ofType(deleteRemindersResolve),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Success, `Successfully deleted reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  deleteReminderError$ = createEffect(() => this._actions$.pipe(
    ofType(deleteRemindersError),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Error, `Failed deleting reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  createReminderStart$ = createEffect(() => this._actions$.pipe(
    ofType(createRemindersStart),
    switchMap(({ reminder }) => this._remindersService.addUpdateReminder({
      ...reminder,
      frequency: ReminderFrequency[ReminderFrequency[reminder.frequency]]
    } as CommunicationReminders)
    .pipe(
      switchMap((s) => [createRemindersResolve({
        reminder: {
          ...reminder,
          reminderId: s,
          // New date screws with the sorting when compared to values from the api
          // Hacky but we need the isoString to sort values.
          insertedDateTime: new Date(Date.now()).toISOString() as unknown as Date
        }
      })]),
      catchError(() => of(createRemindersError({ reminder: reminder })))
    ))
  ));

  createReminderResolve$ = createEffect(() => this._actions$.pipe(
    ofType(createRemindersResolve),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Success, `Successfully created reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  createReminderError$ = createEffect(() => this._actions$.pipe(
    ofType(createRemindersError),
    tap(({ reminder }) => this._toastService.addToast(ToastType.Error, `Failed creating reminder: ${reminder.reminderName}`))
  ), { dispatch: false });

  deleteAllReminders$ = createEffect(() => this._actions$.pipe(
    ofType(deleteAllRemindersStart),
    switchMap(() => this._remindersService.deleteAllReminders().pipe(
      switchMap(() => [deleteAllRemindersResolve()]),
      catchError(() => of(deleteRemindersError))
    ))
  ));

  deleteAllReminderResolve$ = createEffect(() => this._actions$.pipe(
    ofType(deleteAllRemindersResolve),
    tap(() => this._toastService.addToast(ToastType.Success, `Successfully deleted all reminders`))
  ), { dispatch: false });

  deleteAllReminderError$ = createEffect(() => this._actions$.pipe(
    ofType(deleteRemindersError),
    tap(() => this._toastService.addToast(ToastType.Error, `Failed deleting all reminders`))
  ), { dispatch: false });

  constructor(
    private _actions$: Actions,
    private _remindersService: RemindersService,
    private _toastService: ToastService
    ) {}
}
