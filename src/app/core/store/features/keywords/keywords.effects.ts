import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import {
  getAllKeywordsStart,
  getAllKeywordsError,
  getAllKeywordsResolve,
} from './keywords.actions';
import { KeywordsService } from 'src/app/api/keywords/keywords.service';
import { Keyword } from './keywords.models';
import { deleteAllKeywords, setKeywords, deleteSelectedKeywords, showDeleteSelection, singleKeywordDelete } from './keywords.actions';
import { removeLoader } from '../loader/loader.actions';
import { KeywordsFacade } from './keywords.facade';


@Injectable({
  providedIn: 'root'
})
export class KeywordsEffects {

  getAllKeywords$ = createEffect(() => this._actions$.pipe(
    ofType(getAllKeywordsStart),
    switchMap(() => this._keywordsService.getUserKeywords(50, 0)
      .pipe(
        switchMap(({pagedObjects}) => {
          return [getAllKeywordsResolve({ keywords: pagedObjects.map(s => ({
            ...s
          }) as Keyword) })];
        }),
      catchError(() => of(getAllKeywordsError()))),
      )
  ));

  deleteAllKeywords$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteAllKeywords),
      switchMap(() =>
        this._keywordsService.deleteAllKeywords().pipe(
          switchMap(() => [removeLoader(), setKeywords({ keywords: [] })]),
          catchError((e) => {
            this._toastService.addToast(
              ToastType.Error,
              'Something went wrong deleting keywords.',
            );

            console.error(e);

            return of(removeLoader());
          }),
        ),
      ),
    ),
  );

  deleteSelectedKeywords$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteSelectedKeywords),
      withLatestFrom(
        this._keywordsFacade.keywordsToDelete$,
        this._keywordsFacade.allKeywords$
      ),
      switchMap(([_, keywordIds, existingKeywords]) => {
        const keywordsDeleteRequests = keywordIds.map((id) =>
          this._keywordsService.deleteSpecificKeyword(id),
        );

        return forkJoin(keywordsDeleteRequests).pipe(
          switchMap(() => [
            setKeywords({
              keywords: existingKeywords.filter(
                (keyword) => !keyword.flaggedForDelete
              )
            }),
            showDeleteSelection({ show: false }),
            removeLoader(),
          ]),
          catchError((error) => {
            this._toastService.addToast(
              ToastType.Error,
              'Something went wrong deleting keywords.',
            );

            console.error(error);

            return of(removeLoader());
          }),
        );
      }),
    ),
  );

  singleKeywordDelete$ = createEffect(() =>
    this._actions$.pipe(
      ofType(singleKeywordDelete),
      withLatestFrom(this._keywordsFacade.allKeywords$),
      switchMap(([action, existingKeywords]) =>
      this._keywordsService.deleteSpecificKeyword(action.keyword).pipe(
          switchMap(() => [
            setKeywords({
              keywords: existingKeywords.filter(
                (keyword) => keyword.keyword !== action.keyword
              ),
            }),
            removeLoader(),
          ]),
        ),
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          'Something went wrong deleting keyword.',
        );

        console.error(error);

        return of(removeLoader());
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _keywordsService: KeywordsService,
    private _toastService: ToastService,
    private _keywordsFacade: KeywordsFacade,
    ) {}
}
