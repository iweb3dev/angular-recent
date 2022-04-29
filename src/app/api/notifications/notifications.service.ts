import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { ImportResultsDetail } from '../members/members.models';
import { PagedList } from '../shared/shared.models';

import {
  NOTIFICATIONS_API,
  GET_USER_NOTIFICATIONS,
  DELETE_ALL_NOTIFICATIONS_ASSIGNED_TO_THIS_USER,
  DELETE_SPECIFIC_NOTIFICATION,
  GET_SPECIFIC_NOTIFICATION,
  GET_USER_NOTIFICATIONS_COUNT
} from './notification.api';
import { UserNotification } from './notifications.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _http: Http) {}

  getAllNotifications() {
    return this._http.get(NOTIFICATIONS_API);
  }

  deleteAllNotificationsAssignedToThisUser():
    Observable<object> {
    return this._http
      .delete(DELETE_ALL_NOTIFICATIONS_ASSIGNED_TO_THIS_USER);
  }

  getUserNotifications(pageSize?: number, pageIndex?: number):
    Observable<UserNotification[]> {
    return this._http
      .get<UserNotification[]>(GET_USER_NOTIFICATIONS(pageSize, pageIndex));
  }

  deleteSpecificNotification(notificationId: number):
    Observable<object> {
    return this._http
      .delete(DELETE_SPECIFIC_NOTIFICATION(notificationId));
  }

  getSpecificNotification(notificationId: number, pageSize?: number, pageIndex?: number):
    Observable<PagedList<ImportResultsDetail>> {
    return this._http
      .get<PagedList<ImportResultsDetail>>(GET_SPECIFIC_NOTIFICATION(notificationId, pageSize, pageIndex));
  }

  getUserNotificationsCount():
    Observable<number> {
    return this._http
      .get<number>(GET_USER_NOTIFICATIONS_COUNT);
  }
}
