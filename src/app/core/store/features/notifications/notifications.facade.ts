import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getAllNotificationsStart } from './notifications.actions';
import { getLatestNotifications } from './notifications.selector';

@Injectable({
  providedIn: 'root'
})
export class NotificationsFacade {

  allNotifications$ = this._store.select(getAllNotificationsStart);
  latestNotifications$ = this._store.select(getLatestNotifications);

  constructor(private _store: Store<AppState>) {}

  getAllNotifications() {
    this._store.dispatch(getAllNotificationsStart());
  }
}
