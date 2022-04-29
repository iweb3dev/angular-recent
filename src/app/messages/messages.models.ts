import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';
import { NotificationFormatValues } from '../shared/models/message/message.models';
import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from './library/message-filters/message-filters.models';

export interface LibraryStateModel {
  messageLibraryReducer: MessageLibraryStateModel;
}

export interface MessageLibraryStateModel {
  messages: MessagesListModel[];
  filteredList: MessagesListModel[];
  filters: MessageLibraryFiltersStateModel;
  showDeleteSelection: boolean;
  messagesLoaded: boolean;
}

export type MessageLibraryFiltersStateModel = MessageTypeFilterModel & {
  dateFilter: DateFilterEnum;
};

export type MessagesListModel = MessagePagedObjectsDto & {
  flaggedForDelete?: boolean;
};
