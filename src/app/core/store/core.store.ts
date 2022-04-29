import { ActionReducerMap } from '@ngrx/store';
import * as fromGroup from './features/groups/group.reducer';
import * as fromUser from './features/user/user.reducer';
import * as fromNotification from './features/notifications/notifications.reducer';
import * as fromCommunications from './features/communications/communications.reducer';
import * as fromLookups from './features/lookups/lookups.reducer';
import * as fromUserAddress from './features/user-address/user-address.reducer';
import * as fromUserPhones from './features/user-phones/user-phones.reducer';
import * as fromUserEmail from './features/user-email/user-email.reducer';
import * as fromSystemSettings from './features/system-settings/system-settings.reducer';
import * as fromReminders from './features/reminders/reminders.reducer';
import * as fromNewMessage from './features/new-message/new-message.reducer';
import * as fromKeywords from './features/keywords/keywords.reducer';
import * as fromPhoneNumbers from './features/phone-numbers/phone-numbers.reducer';
import * as fromGroupManagers from './features/group-managers/group-managers.reducer';
import { GroupEffects } from './features/groups/group.effects';
import { UserEffects } from './features/user/user.effects';
import { UserStateModel } from './features/user/user.model';
import { NotificationEffects } from './features/notifications/notifications.effects';
import { CommunicationsEffects } from './features/communications/communications.effects';
import { LookupsState } from './features/lookups/lookups.models';
import { LookupsEffects } from './features/lookups/lookups.effects';
import { UserAddressEffects } from './features/user-address/user-address.effects';
import { UserEmailEffects } from './features/user-email/user-email.effects';
import { UserPhoneEffects } from './features/user-phones/user-phone.effects';
import { SystemSettingsEffects } from './features/system-settings/system-settings.effects';
import { LoaderEffects } from './features/loader/loader.effects';
import { RemindersEffects } from './features/reminders/reminders.effects';
import { CreateMessageEffects } from './features/new-message/create-message/create-message.effects';
import { NewMessageStateModel } from './features/new-message/new-message.models';
import { ConfirmEffects } from './features/new-message/confirm/confirm.effects';
import { NewMessageEffects } from './features/new-message/new-message.effects';
import { KeywordsEffects } from './features/keywords/keywords.effects';
import { PhoneNumbersEffects } from './features/phone-numbers/phone-numbers.effects';
import { GroupManagersEffects } from './features/group-managers/group-managers.effects';

export const featureStore = 'coreStore';

export interface CoreState {
  [fromGroup.groupSlice]: fromGroup.GroupState;
  [fromUser.userSlice]: UserStateModel;
  [fromNotification.notificationSlice]: fromNotification.NotificationState;
  [fromCommunications.communicationsSlice]: fromCommunications.CommunicationState;
  [fromLookups.lookupsSlice]: LookupsState;
  [fromUserAddress.userAddressSlice]: fromUserAddress.UserAddressState;
  [fromUserPhones.userPhoneSlice]: fromUserPhones.UserAddressState;
  [fromUserEmail.userEmailSlice]: fromUserEmail.UserAddressState;
  [fromSystemSettings.systemSettingsSlice]: fromSystemSettings.SystemSettingsState;
  [fromReminders.remindersSlice]: fromReminders.RemindersState;
  [fromKeywords.keywordsSlice]: fromKeywords.KeywordsState;
  [fromPhoneNumbers.phoneNumbersSlice]: fromPhoneNumbers.PhoneNumbersState;
  [fromGroupManagers.groupManagersSlice]: fromGroupManagers.GroupManagersState;
  [fromNewMessage.newMessageFeatureKey]: NewMessageStateModel;
}

export const reducers: ActionReducerMap<CoreState> = {
  [fromGroup.groupSlice]: fromGroup.reducer,
  [fromUser.userSlice]: fromUser.reducer,
  [fromNotification.notificationSlice]: fromNotification.reducer,
  [fromCommunications.communicationsSlice]: fromCommunications.reducer,
  [fromLookups.lookupsSlice]: fromLookups.reducer,
  [fromUserAddress.userAddressSlice]: fromUserAddress.reducer,
  [fromUserPhones.userPhoneSlice]: fromUserPhones.reducer,
  [fromUserEmail.userEmailSlice]: fromUserEmail.reducer,
  [fromSystemSettings.systemSettingsSlice]: fromSystemSettings.reducer,
  [fromReminders.remindersSlice]: fromReminders.reducer,
  [fromKeywords.keywordsSlice]: fromKeywords.reducer,
  [fromPhoneNumbers.phoneNumbersSlice]: fromPhoneNumbers.reducer,
  [fromNewMessage.newMessageFeatureKey]: fromNewMessage.reducer,
  [fromGroupManagers.groupManagersSlice]: fromGroupManagers.reducer
};

export const effects = [
  GroupEffects,
  UserEffects,
  NotificationEffects,
  CommunicationsEffects,
  LookupsEffects,
  UserAddressEffects,
  UserEmailEffects,
  UserPhoneEffects,
  SystemSettingsEffects,
  LoaderEffects,
  RemindersEffects,
  KeywordsEffects,
  PhoneNumbersEffects,
  GroupManagersEffects,
  CreateMessageEffects,
  ConfirmEffects,
  NewMessageEffects,
];
