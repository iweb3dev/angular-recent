import { createAction, props } from '@ngrx/store';
import { Keyword } from './keywords.models';
import { Update } from '@ngrx/entity';

export const getAllKeywordsStart = createAction('[Keywords] Get All Start');
export const getAllKeywordsResolve = createAction(
  '[Keywords] Get All Resolve',
  props<{ keywords: Keyword[] }>(),
);
export const getAllKeywordsError = createAction('[Keywords] Get All Error');

export const deleteKeywordsStart = createAction(
  '[Keywords] Delete Start',
  props<{ keyword: Keyword }>(),
);
export const deleteKeywordsResolve = createAction(
  '[Keywords] Delete Resolve',
  props<{ keyword: Keyword }>(),
);
export const deleteKeywordsError = createAction(
  '[Keywords] Delete Error',
  props<{ keyword: Keyword }>(),
);

export const showDeleteSelection = createAction(
  '[Keywords Actions] Show Delete Selection',
  props<{ show: boolean }>(),
);

export const selectAllKeywordsForDelete = createAction(
  '[Keywords Actions] Select All For Delete',
  props<{ shouldSelect: boolean }>(),
);

export const setKeywordForDelete = createAction(
  '[Keywords Actions] Set Keyword For Delete',
  props<{ update: Update<Keyword> }>()
);

export const deleteAllKeywords = createAction(
  '[Keywords Actions] Delete All Keywords',
);

export const deleteSelectedKeywords = createAction(
  '[Keywords Actions] Delete Selected Keywords',
);

export const singleKeywordDelete = createAction(
  '[Keywords Actions] Single Keyword Delete',
  props<{ keyword: string }>(),
);

export const setKeywords = createAction(
  '[Keywords] Set Keywords',
  props<{ keywords: Keyword[] }>(),
);

