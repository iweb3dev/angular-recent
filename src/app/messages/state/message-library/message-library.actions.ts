import { createAction, props } from '@ngrx/store';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from '../../library/message-filters/message-filters.models';

export const setMessages = createAction(
  '[Message Library Actions] Set Messages',
  props<{ messages: MessagePagedObjectsDto[] }>(),
);

export const filterByDate = createAction(
  '[Message Library Actions] Filter By Date',
  props<{ filter: DateFilterEnum }>(),
);

export const setNotificationFormatsFilter = createAction(
  '[Message Library Actions] Set Notification Formats Filter',
  props<{ formats: MessageTypeFilterModel }>(),
);

export const deleteAllMessages = createAction(
  '[Message Library Actions] Delete All Messages',
);

export const deleteSelectedMessages = createAction(
  '[Message Library Actions] Delete Selected Messages',
);

export const showDeleteSelection = createAction(
  '[Message Library Actions] Show Delete Selection',
  props<{ show: boolean }>(),
);

export const setMessageForDelete = createAction(
  '[Message Library Actions] Set Message For Delete',
  props<{
    messageId: number;
    shouldDelete: boolean;
  }>(),
);

export const selectAllMessagesForDelete = createAction(
  '[Message Library Actions] Select All For Delete',
  props<{ shouldSelect: boolean }>(),
);

export const messagesSearch = createAction(
  '[Message Library Actions] Search Messages',
  props<{ searchValue: string }>(),
);

export const singleMessageDelete = createAction(
  '[Message Library Actions] Single Message Delete',
  props<{ id: number }>(),
);
