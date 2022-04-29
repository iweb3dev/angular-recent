import { createAction, props } from '@ngrx/store';
import { CommunicationReminder } from './reminders.models';

export const getAllRemindersStart = createAction('[Reminders] Get All Start');
export const getAllRemindersResolve = createAction('[Reminders] Get All Resolve',
props<{ reminders: CommunicationReminder[] }>());
export const getAllRemindersError = createAction('[Reminders] Get All Error');

export const createRemindersStart = createAction('[Reminders] Create Start',
props<{ reminder: CommunicationReminder }>());
export const createRemindersResolve = createAction('[Reminders] Create Resolve',
props<{ reminder: CommunicationReminder }>());
export const createRemindersError = createAction('[Reminders] Create Error',
props<{ reminder: CommunicationReminder }>());

export const updateRemindersStart = createAction('[Reminders] Update Start',
props<{ reminder: CommunicationReminder }>());
export const updateRemindersResolve = createAction('[Reminders] Update Resolve',
props<{ reminder: CommunicationReminder }>());
export const updateRemindersError = createAction('[Reminders] Update Error',
props<{ reminder: CommunicationReminder }>());

export const deleteRemindersStart = createAction('[Reminders] Delete Start',
props<{ reminder: CommunicationReminder }>());
export const deleteRemindersResolve = createAction('[Reminders] Delete Resolve',
props<{ reminder: CommunicationReminder }>());
export const deleteRemindersError = createAction('[Reminders] Delete Error',
props<{ reminder: CommunicationReminder }>());


export const deleteAllRemindersStart = createAction('[Reminders] Delete All Start');
export const deleteAllRemindersResolve = createAction('[Reminders] Delete All Resolve');
export const deleteAllRemindersError = createAction('[Reminders] Delete All Error');
