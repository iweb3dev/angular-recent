import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getAllKeywordsResolve,
  deleteKeywordsResolve,
  showDeleteSelection,
  selectAllKeywordsForDelete,
} from './keywords.actions';
import { Keyword } from './keywords.models';
import { setKeywordForDelete, setKeywords } from './keywords.actions';

export const keywordsSlice = 'keywords';
const keywordsAdapter = createEntityAdapter<Keyword>({
  selectId: (keyword: Keyword) => keyword.keyword,
});

export interface KeywordsState extends EntityState<Keyword> {
  showDeleteSelection: boolean;
}

export const initialState = keywordsAdapter.getInitialState({
  showDeleteSelection: false
});

const keywordsReducer = createReducer(
  initialState,
  on(setKeywords, (state,  { keywords }) =>  keywordsAdapter.setAll(keywords, state)),
  on(getAllKeywordsResolve, (state, { keywords }) =>
    keywordsAdapter.setAll(keywords, state),
  ),
  on(deleteKeywordsResolve, (state, { keyword }) =>
    keywordsAdapter.removeOne(keyword.keyword, state),
  ),
  on(showDeleteSelection, (state, action) => {
    return {
      ...state,
      showDeleteSelection: action.show
    };
  }),
  on(selectAllKeywordsForDelete, (state, action) => {
    return keywordsAdapter.map((keyword) => ({
      ...keyword,
      flaggedForDelete: action.shouldSelect
    }), state);
  }),
  on(setKeywordForDelete, (state, action) => {
    return keywordsAdapter.updateOne(action.update, state);
  })
);

export function reducer(state: KeywordsState, action: Action) {
  return keywordsReducer(state, action);
}

const {
  selectAll,
} = keywordsAdapter.getSelectors();

// select the array of keywords
export const selectAllKeywords = selectAll;
