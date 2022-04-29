import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import {
  createCommunicationFailure,
  createCommunicationSuccess,
} from 'src/app/core/store/features/new-message/new-message.actions';
import { redirectToRoute } from './schedule-message.actions';

@Injectable()
export class ScheduleMessageffects {
  createCommunicationSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createCommunicationSuccess),
      map(() =>
        redirectToRoute({
          route: ['new-communication', 'success'],
        }),
      ),
    ),
  );

  createCommunicationFailure$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createCommunicationFailure),
      map(() => redirectToRoute({ route: ['new-communication', 'details'] })),
    ),
  );

  redirectToRoute$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(redirectToRoute),
        tap((action) => this._router.navigate(action.route)),
      ),
    { dispatch: false },
  );

  constructor(private _actions$: Actions, private _router: Router) {}
}
