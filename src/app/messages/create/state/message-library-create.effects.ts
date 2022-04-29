import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import {
  resetCreateMessageState,
  showConfirmCommunicationPopup,
} from 'src/app/core/store/features/new-message/new-message.actions';

import { MessageLibraryDetailsService } from '../details/message-library-details.service';
import { redirectToRoute } from './message-library-create.actions';

@Injectable()
export class MessageLibraryCreateEffects {
  createCommunication$ = createEffect(() =>
    this._actions$.pipe(
      ofType(showConfirmCommunicationPopup),
      switchMap(() =>
        this._messageLibraryDetailsService.openMessageCreateDialog().pipe(
          switchMap((schedule) => {
            if (schedule) {
              return [
                //  showLoader(),
                // queueCommunication(),
                redirectToRoute({ route: ['schedule-message', 'name'] }),
              ];
            }

            return [
              resetCreateMessageState(),
              redirectToRoute({ route: ['messages', 'library'] }),
            ];
          }),
        ),
      ),
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

  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _messageLibraryDetailsService: MessageLibraryDetailsService,
  ) {}
}
