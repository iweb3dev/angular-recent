import { Action, createReducer, on } from '@ngrx/store';
import {
  createEmailFormatsMap,
  createTextFormatMap,
  createVoiceFormatMap,
} from 'src/app/shared/utils/message/notification-format.helper';
import { DateFilterEnum } from '../../library/message-filters/message-filters.models';

import { MessageLibraryStateModel } from '../../messages.models';
import {
  filterByDate,
  setMessageForDelete,
  setMessages,
  setNotificationFormatsFilter,
  showDeleteSelection,
  selectAllMessagesForDelete,
  messagesSearch,
} from './message-library.actions';

export const initialMessageLibraryState: MessageLibraryStateModel = {
  messages: [],
  filteredList: [],
  showDeleteSelection: false,
  messagesLoaded: false,
  filters: {
    dateFilter: DateFilterEnum.Desc,
    hasVoiceMessage: true,
    hasTextMessage: true,
    hasEmailMessage: true,
  },
};

const reducer = createReducer(
  initialMessageLibraryState,
  on(setMessages, (state, action) => ({
    ...state,
    messages: action.messages,
    filteredList: action.messages,
    messagesLoaded: true,
  })),
  on(filterByDate, (state, action) => {
    const messages = [...state.filteredList].sort((a, b) => {
      const start = new Date(a.modifiedByDateTime).getTime();
      const end = new Date(b.modifiedByDateTime).getTime();

      return action.filter === DateFilterEnum.Asc ? start - end : end - start;
    });

    return {
      ...state,
      filteredList: messages,
      filters: { ...state.filters, dateFilter: action.filter },
    };
  }),
  on(setNotificationFormatsFilter, (state, action) => {
    let notificationsMaps = new Map();

    if (action.formats.hasEmailMessage) {
      notificationsMaps = new Map([
        ...notificationsMaps,
        ...createEmailFormatsMap(),
      ]);
    }

    if (action.formats.hasTextMessage) {
      notificationsMaps = new Map([
        ...notificationsMaps,
        ...createTextFormatMap(),
      ]);
    }

    if (action.formats.hasVoiceMessage) {
      notificationsMaps = new Map([
        ...notificationsMaps,
        ...createVoiceFormatMap(),
      ]);
    }

    const newMessages = state.messages.filter((message) =>
      notificationsMaps.has(message.notificationFormatValue),
    );

    return {
      ...state,
      filteredList: newMessages,
      filters: {
        ...state.filters,
        ...action.formats,
      },
    };
  }),
  on(showDeleteSelection, (state, action) => ({
    ...state,
    showDeleteSelection: action.show,
  })),
  on(setMessageForDelete, (state, action) => {
    const newMessages = state.filteredList.map((message) => {
      if (message.id === action.messageId) {
        return {
          ...message,
          flaggedForDelete: action.shouldDelete,
        };
      }

      return { ...message };
    });

    return {
      ...state,
      filteredList: newMessages,
    };
  }),
  on(selectAllMessagesForDelete, (state, action) => ({
    ...state,
    filteredList: state.filteredList.map((message) => ({
      ...message,
    flaggedForDelete: action.shouldSelect,
    })),
  })),
  on(messagesSearch, (state, action) => ({
    ...state,
    filteredList: !action.searchValue
      ? state.messages
      : state.messages.filter((message) =>
          message.notificationName
            .toLowerCase()
            .includes(action.searchValue.toLowerCase()),
        ),
  })),
);

export function messageLibraryReducer(
  state: MessageLibraryStateModel,
  action: Action,
): MessageLibraryStateModel {
  return reducer(state, action);
}
