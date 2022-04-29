import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Notification } from 'src/app/shared/models/domain/notification.model';
import { UserNotification } from 'src/app/api/notifications/notifications.models';
import { getAllNotificationsResolve } from './notifications.actions';

export const notificationSlice = 'notifications';
const notificationAdapter = createEntityAdapter<UserNotification>();

export interface NotificationState extends EntityState<UserNotification> {}

export const intitalState = notificationAdapter.getInitialState();

const notificationReducer = createReducer(
  intitalState,
  on(getAllNotificationsResolve, (state, { notifications }) =>
  notificationAdapter.setAll(notifications, state)
  )
);

export function reducer(state: NotificationState, action: Action) {
  return notificationReducer(state, action);
}
