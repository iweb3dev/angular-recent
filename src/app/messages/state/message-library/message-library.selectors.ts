import { createSelector } from '@ngrx/store';
import { MessageLibraryStateModel } from '../../messages.models';

import { selectMessageLibraryState } from '../library.selectors';

export const selectMessages = createSelector(
  selectMessageLibraryState,
  (state: MessageLibraryStateModel) => state.filteredList,
);

export const selectNumberOfMessages = createSelector(
  selectMessageLibraryState,
  (state: MessageLibraryStateModel) => state.messages.length,
);

export const selectFilters = createSelector(
  selectMessageLibraryState,
  (state) => state.filters,
);

export const selectMessagesLoaded = createSelector(
  selectMessageLibraryState,
  (state) => state.messagesLoaded,
);

export const selectShowDeleteSelection = createSelector(
  selectMessageLibraryState,
  (state: MessageLibraryStateModel) => state.showDeleteSelection,
);

export const selectMessagesToDelete = createSelector(
  selectMessageLibraryState,
  (state: MessageLibraryStateModel) =>
    state.filteredList
      .filter((message) => message.flaggedForDelete)
      .map((message) => message.id),
);
