import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { PagedList } from '../shared/shared.models';
import { CommunicationReminders } from './reminders.models';
import {
  DELETE_ALL_REMINDERS,
  DELETE_SPECIFIC_REMINDER,
  ADD_UPDATE_REMINDER,
  GET_USER_REMINDERS,
} from './reminders.api';

@Injectable({
  providedIn: 'root',
})
export class RemindersService {
  constructor(private _Http: Http) {}

  // Delete all outstanding reminders for a user.
  deleteAllReminders(): Observable<object> {
    return this._Http.delete(DELETE_ALL_REMINDERS);
  }

  // Delete a specific reminder by its ID number
  deleteSpecificReminder(reminderId: number): Observable<object> {
    return this._Http.delete(DELETE_SPECIFIC_REMINDER(reminderId));
  }

  addUpdateReminder(reminder: CommunicationReminders): Observable<number> {
    return this._Http.post<number>(ADD_UPDATE_REMINDER, reminder);
  }

  getUserReminders(
    pageSize?: number,
    pageIndex?: number,
  ): Observable<PagedList<CommunicationReminders>> {
    return this._Http.get<PagedList<CommunicationReminders>>(
      GET_USER_REMINDERS(pageSize, pageIndex),
    );
  }
}
