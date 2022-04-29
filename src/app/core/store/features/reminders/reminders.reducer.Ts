import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { createRemindersResolve, deleteAllRemindersResolve, deleteRemindersResolve, getAllRemindersResolve, updateRemindersResolve } from './reminders.actions';
import { CommunicationReminder } from './reminders.models';

export const remindersSlice = 'reminders';
const remindersAdapter = createEntityAdapter<CommunicationReminder>({
  selectId: (reminder) => reminder.reminderId
});

export interface RemindersState extends EntityState<CommunicationReminder> {}

export const initialState = remindersAdapter.getInitialState();

const remindersReducer = createReducer(
  initialState,
  on(getAllRemindersResolve, (state, { reminders }) => remindersAdapter.setAll(reminders, state)),
  on(updateRemindersResolve, (state, { reminder }) => remindersAdapter.updateOne({
    changes: reminder,
    id: reminder.reminderId
  }, state)),
  on(createRemindersResolve, (state, { reminder }) => remindersAdapter.addOne(reminder, state)),
  on(deleteRemindersResolve, (state, { reminder }) => remindersAdapter.removeOne(reminder.reminderId, state)),
  on(deleteAllRemindersResolve, (state) => remindersAdapter.removeAll(state))
);

export function reducer(state: RemindersState, action: Action) {
  return remindersReducer(state, action);
}
