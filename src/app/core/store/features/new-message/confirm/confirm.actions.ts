import { createAction, props } from '@ngrx/store';
import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';

import { ResponseUserSystemSettings } from 'src/app/api/users/users.models';
import { ScheduleOptionsModel } from 'src/app/new-communication/communication-details/message-confirm/message-confirm.models';
import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

export const fetchCommunicationQueue = createAction(
  '[Confirm Message Actions] Fetch Communication Queue',
);

export const setPhoneMessageLength = createAction(
  '[Confirm Message Actions] Set Phone Message Length',
  props<{ phoneMessageLength: number }>(),
);

export const setCommunicationQueue = createAction(
  '[Confirm Message Actions] Set Communication Queue',
  props<{ queue: BuildCommuniationsQueue }>(),
);

export const fetchPhoneMessageLength = createAction(
  '[Confirm Message Actions] Fetch Message Length',
  props<{ messageId: number; formatId: NotificationFormatValues }>(),
);

export const setScheduleOptions = createAction(
  '[Confirm Message Actions] Schedule Options',
  props<{ scheduleOptions: ScheduleOptionsModel }>(),
);

export const communicationConfirm = createAction(
  '[Confirm Actions] Communication Confirm',
);

export const communicationCancel = createAction(
  '[Cancel Actions] Communication Cancelled',
  props<{
    communicationId: number;
    searchCriteria: string;
    groupId: number;
    historyTypeId: number;
    pageSize: number;
    pageIndex: number;
  }>(),
);

export const scheduleMessage = createAction(
  '[Confirm Actions] Schedule Message',
  props<{ isMobileView: boolean }>(),
);

export const setUserSystemSettings = createAction(
  '[Confirm Actions] User System Settings',
  props<{ settings: ResponseUserSystemSettings[] }>(),
);
