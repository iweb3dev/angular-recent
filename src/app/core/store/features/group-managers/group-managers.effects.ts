import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { GroupManagersService } from 'src/app/api/group-managers/group-managers.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { getAllGroupManagersStart, getAllGroupManagersError, getAllGroupManagersResolve } from './group-managers.actions';
import { GroupManagers } from './group-managers.models';
import { removeLoader } from '../loader/loader.actions';

@Injectable({
  providedIn: 'root'
})
export class GroupManagersEffects {

  getAllGroupManagers$ = createEffect(() => this._actions$.pipe(
    ofType(getAllGroupManagersStart),
    switchMap(() => this._groupManagersService.getGroupManagers()
    .pipe(
      switchMap((gManagers) => {
        return [getAllGroupManagersResolve({ groupManagers: gManagers.map(s => ({
          ...s
        }) as GroupManagers) })];
      }
      ),
      catchError(() => of(getAllGroupManagersError())))
      )
  ));

  // getAllKeywords$ = createEffect(() => this._actions$.pipe(
  //   ofType(getAllKeywordsStart),
  //   switchMap(() => this._keywordsService.getUserKeywords(50, 0)
  //     .pipe(
  //       switchMap(({pagedObjects}) => {
  //         return [getAllKeywordsResolve({ keywords: pagedObjects.map(s => ({
  //           ...s
  //         }) as Keyword) })];
  //       }),
  //     catchError(() => of(getAllKeywordsError()))),
  //     )
  // ));


  constructor(
    private _actions$: Actions,
    private _groupManagersService: GroupManagersService,
    ) {}
}
