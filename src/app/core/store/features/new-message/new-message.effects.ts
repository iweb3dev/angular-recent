import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationFormatValues } from '@shared/models/message/message.models';
import { hasPhoneFormat } from '@shared/utils/message/notification-format.helper';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { MessagesService } from 'src/app/api/messages/messages.service';
import { removeLoader } from 'src/app/core/store/features/loader/loader.actions';
import { MessageDataService } from 'src/app/domain/message-data/message-data.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';

import { openPreviousMessage, setCreateMessageName, setPlayBackAudio, setPreviousMessage, updateMessage } from './new-message.actions';

@Injectable()
export class NewMessageEffects {
  openPreviousMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openPreviousMessage),
      switchMap(({ id, isIncludeTextMessage }) => {
        if (isIncludeTextMessage) {
          return this._messagesService.canExistingTextMessageBeSent(id).pipe(
            map((canBeSent) => {
              if (!canBeSent) {
                this._toastService.addToast(ToastType.Error, 'Unfortunately, this message cannot be sent.');

                return removeLoader();
              }

              return setPreviousMessage({ id });
            }),
            catchError((error) => {
              this._toastService.addToast(ToastType.Error, 'Unfortunately, this message cannot be sent.');

              return of(removeLoader());
            })
          );
        }

        return of(setPreviousMessage({ id }));
      })
    )
  );

  setPreviousMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPreviousMessage),
      switchMap(({ id }) =>
        forkJoin([
          this._messageDataService.fetchMessageSnapshot(id),
          this._messagesService.fetchMessageFiles(id, NotificationFormatValues.VoiceMessage),
        ]).pipe(
          switchMap(([messageData, files]) => {
            const actions = [
              updateMessage({ updateParams: messageData.message }),
              setCreateMessageName({
                data: {
                  messageId: messageData.messageId,
                  isPreviousMessage: true,
                  messageName: messageData.message.messageName,
                  notificationFormatValue: messageData.notificationFormatValue,
                },
              }),
              removeLoader(),
              setPlayBackAudio({
                fileUrl: hasPhoneFormat(messageData.notificationFormatValue) ? files.fileName : null,
              }),
            ];

            return actions;
          }),
          catchError((e) => {
            this._toastService.addToast(ToastType.Error, 'Error receiving message data.');

            console.error(e);
            return of(removeLoader());
          })
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _toastService: ToastService,
    private _messagesService: MessagesService,
    private _messageDataService: MessageDataService
  ) {}
}
