import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { MessagesService } from 'src/app/api/messages/messages.service';
import { removeLoader } from 'src/app/core/store/features/loader/loader.actions';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

import {
  deleteAllMessages,
  deleteSelectedMessages,
  setMessages,
  showDeleteSelection,
  singleMessageDelete,
} from './message-library.actions';
import { MessageLibraryFacade } from './message-library.facade';

@Injectable()
export class MessageLibraryEffects {
  deleteAllMessages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteAllMessages),
      switchMap(() =>
        this._messagesService.deleteAllMessages().pipe(
          switchMap(() => [removeLoader(), setMessages({ messages: [] })]),
          catchError((e) => {
            this._toastService.addToast(
              ToastType.Error,
              'Something went wrong deleting messages.',
            );

            console.error(e);

            return of(removeLoader());
          }),
        ),
      ),
    ),
  );

  deleteSelectedMessages$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteSelectedMessages),
      withLatestFrom(
        this._messageLibraryFacade.messagesToDelete$,
        this._messageLibraryFacade.messages$,
      ),
      switchMap(([_, messageIds, existingMessages]) => {
        const messagesDeleteRequests = messageIds.map((id) =>
          this._messagesService.deleteSpecificMessage(id),
        );

        return forkJoin(messagesDeleteRequests).pipe(
          switchMap(() => [
            setMessages({
              messages: existingMessages.filter(
                (message) => !message.flaggedForDelete,
              ),
            }),
            showDeleteSelection({ show: false }),
            removeLoader(),
          ]),
          catchError((error) => {
            this._toastService.addToast(
              ToastType.Error,
              error.error?.length ? error.error[0] : 'Something went wrong deleting messages.',
            );

            console.error(error);

            return of(removeLoader());
          }),
        );
      }),
    ),
  );

  singleMessageDelete$ = createEffect(() =>
    this._actions$.pipe(
      ofType(singleMessageDelete),
      withLatestFrom(this._messageLibraryFacade.messages$),
      switchMap(([action, existingMessages]) =>
        this._messagesService.deleteSpecificMessage(action.id).pipe(
          switchMap(() => [
            setMessages({
              messages: existingMessages.filter(
                (message) => message.id !== action.id,
              ),
            }),
            removeLoader(),
          ]),
        ),
      ),
      catchError((error) => {
        this._toastService.addToast(
          ToastType.Error,
          error.error?.length ? error.error[0] : 'Something went wrong deleting messages.',
        );

        console.error(error);

        return of(removeLoader());
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _toastService: ToastService,
    private _messagesService: MessagesService,
    private _messageLibraryFacade: MessageLibraryFacade,
  ) {}
}
