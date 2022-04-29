import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllGroupsError,
  getAllGroupsResolve,
  getAllGroupsStart,
} from './group.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { GroupService } from 'src/app/api/groups/groups.service';
import { Group } from './group.models';

@Injectable({ providedIn: 'root' })
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private _groupService: GroupService
  ) {}

  getAllGroupsStart = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllGroupsStart),
      switchMap(() =>
        this._groupService.fetchGroups().pipe(
          map(({ pagedObjects }) => getAllGroupsResolve({ groups: pagedObjects as Group[] })),
          catchError(() => of(getAllGroupsError()))
        )
      )
    )
  );

  // getAllGroupsError = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       map(() =>
  //         this._toastService.addToast(
  //           ToastType.Error,
  //           "Failed! Could not retrieve groups!"
  //         )
  //       )
  //     ),
  //   { dispatch: false }
  // );
}
