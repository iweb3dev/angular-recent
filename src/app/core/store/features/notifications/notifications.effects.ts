import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, mergeMap, concatMap, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/api/notifications/notifications.service';
import * as NotificationActions from './notifications.actions';


@Injectable({
  providedIn: 'root'
})
export class NotificationEffects {

  constructor(private _actions$: Actions, private _notificationService: NotificationService) {}

  getAllNotifications = createEffect(() => {
    return this._actions$.pipe(
      ofType(NotificationActions.getAllNotificationsStart),
      mergeMap(() => this._notificationService.getUserNotifications(5, 0).pipe(
        map(notifications => NotificationActions.getAllNotificationsResolve({ notifications })
        )))
    );
  });
}
