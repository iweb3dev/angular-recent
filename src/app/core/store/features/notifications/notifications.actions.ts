import { createAction, props } from '@ngrx/store';
import { Notification } from 'src/app/shared/models/domain/notification.model';
import { UserNotification } from 'src/app/api/notifications/notifications.models';

export const getAllNotificationsStart = createAction(
  '[Notifications] Get All Start'
);

export const getAllNotificationsResolve = createAction(
  '[Notifications] Get All Resolve', props<{ notifications: UserNotification[] }>()
);

export const getAllNotificationsError = createAction(
  '[Notifications] Get All Error'
);
