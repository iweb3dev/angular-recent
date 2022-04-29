import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getAllKeywords, selectShowDeleteSelection, selectKeywordsToDelete } from './keywords.selectors';
import {
  getAllKeywordsStart,
  deleteKeywordsStart,
  showDeleteSelection,
  selectAllKeywordsForDelete,
  setKeywordForDelete
  } from './keywords.actions';
import { Keyword } from './keywords.models';
import { Update } from '@ngrx/entity';
import { deleteAllKeywords, deleteSelectedKeywords, singleKeywordDelete } from './keywords.actions';

@Injectable({
  providedIn: 'root'
})
export class KeywordsFacade {
  allKeywords$ = this._store.select(getAllKeywords);
  showDeleteSelection$ = this._store.select(selectShowDeleteSelection);
  keywordsToDelete$ = this._store.select(selectKeywordsToDelete);

  constructor(private _store: Store<AppState>,
    private _actions$: Actions) {}

  fetchKeywords() {
    this._store.dispatch(getAllKeywordsStart());
  }

  deleteKeyword(keyword: Keyword) {
    this._store.dispatch(deleteKeywordsStart({
      keyword: keyword
    }));
  }

  showDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: true }));
  }

  hideDeleteSelection(): void {
    this._store.dispatch(showDeleteSelection({ show: false }));
  }

  selectAllKeywordsForDelete(shouldSelect: { shouldSelect: boolean }): void {
    this._store.dispatch(selectAllKeywordsForDelete(shouldSelect));
  }

  setKeywordForDelete(updateKeywords: Update<Keyword>): void {
    this._store.dispatch(setKeywordForDelete({update: updateKeywords}));
  }

  deleteAllKeywords(): void {
    this._store.dispatch(deleteAllKeywords());
  }

  deleteSelectedKeywords(): void {
    this._store.dispatch(deleteSelectedKeywords());
  }

  singleKeywordDelete(keyword: string): void {
    this._store.dispatch(singleKeywordDelete({ keyword }));
  }
}
