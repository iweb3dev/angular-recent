import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from '../../library/message-filters/message-filters.models';

import { LibraryStateModel } from '../../messages.models';

import {
  deleteAllMessages,
  deleteSelectedMessages,
  filterByDate,
  messagesSearch,
  selectAllMessagesForDelete,
  setMessageForDelete,
  setMessages,
  setNotificationFormatsFilter,
  showDeleteSelection,
  singleMessageDelete,
} from './message-library.actions';
import {
  selectFilters,
  selectMessages,
  selectMessagesLoaded,
  selectMessagesToDelete,
  selectNumberOfMessages,
  selectShowDeleteSelection,
} from './message-library.selectors';

@Injectable()
export class MessageLibraryFacade {
  messages$ = this._store.select(selectMessages);
  filters$ = this._store.select(selectFilters);
  showDeleteSelection$ = this._store.select(selectShowDeleteSelection);
  messagesToDelete$ = this._store.select(selectMessagesToDelete);
  numberOfMessages$ = this._store.select(selectNumberOfMessages);
  messagesLoaded$ = this._store.select(selectMessagesLoaded);

  constructor(private _store: Store<LibraryStateModel>) {}

  setMessages(messages: MessagePagedObjectsDto[]): void {
    this._store.dispatch(setMessages({ messages }));
  }

  filterByDate(filter: DateFilterEnum): void {
    this._store.dispatch(filterByDate({ filter }));
  }

  setNotificationFormatsFilter(formats: MessageTypeFilterModel): void {
    this._store.dispatch(setNotificationFormatsFilter({ formats }));
  }

  deleteAllMessages(): void {
    this._store.dispatch(deleteAllMessages());
  }

  showDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: true }));
  }

  hideDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: false }));
  }

  setMessageForDelete(deleteData: {
    messageId: number;
    shouldDelete: boolean;
  }): void {
    this._store.dispatch(setMessageForDelete(deleteData));
  }

  selectAllMessagesForDelete(shouldSelect: { shouldSelect: boolean }): void {
    this._store.dispatch(selectAllMessagesForDelete(shouldSelect));
  }

  deleteSelectedMessages(): void {
    this._store.dispatch(deleteSelectedMessages());
  }

  searchMessages(searchValue: string): void {
    this._store.dispatch(messagesSearch({ searchValue }));
  }

  singleMessageDelete(id: number): void {
    this._store.dispatch(singleMessageDelete({ id }));
  }
}
