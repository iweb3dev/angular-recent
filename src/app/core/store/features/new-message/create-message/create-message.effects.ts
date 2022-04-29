import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, switchMap, catchError, withLatestFrom } from 'rxjs/operators';

import { showLoader, removeLoader } from 'src/app/core/store/features/loader/loader.actions';
import {
  submitNewMessage,
  queueCommunication,
  updateCommunicationQueue,
  showConfirmCommunicationPopup,
  setPreviousMessage,
} from '../new-message.actions';
import {
  setTextValid,
  setVoiceValid,
  setEmailValid,
  openTextPreview,
  openVoicePreview,
  openEmailPreview,
  setNotificationId,
  createMessageRecord,
  saveMessageInLibrary,
  setNotificationFormatValue,
  saveAndContinueWithPreviousMessage,
  createMessageSuccess,
  createMessageFailure,
  createMessageRecordFromLibrary,
  resetStore,
} from './create-message.actions';

import { NotificationFormatValues } from '@shared/models/message/message.models';
import { TextPreviewDataModel } from 'src/app/components/text-preview/text-preview.models';
import { VoicePreviewDataModel } from 'src/app/components/voice-preview/voice-preview.models';
import { EmailPreviewDataModel } from 'src/app/components/email-preview/email-preview.models';

import { TextPreviewComponent } from 'src/app/components/text-preview/text-preview.component';
import { VoicePreviewComponent } from 'src/app/components/voice-preview/voice-preview.component';
import { EmailPreviewComponent } from 'src/app/components/email-preview/email-preview.component';

import { CreateMessageFacade } from './create-message.facade';
import { CreateMessageService } from './create-message.service';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MessageLibraryDetailsService } from 'src/app/messages/create/details/message-library-details.service';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { Router } from '@angular/router';

@Injectable()
export class CreateMessageEffects {
  openVoiceMessagePreview$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(openVoicePreview),
        withLatestFrom(this._createMessageFacade.voicePreviewData$, this._createMessageFacade.audioRecordingUrl$),
        tap(([, data, filePath]) => {
          this._createMessageService.openMessagePreview<VoicePreviewComponent, Partial<VoicePreviewDataModel>>(VoicePreviewComponent, {
            ...data,
            filename: filePath,
          });
        })
      ),
    { dispatch: false }
  );

  openTextMessagePreview$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(openTextPreview),
        withLatestFrom(this._createMessageFacade.textPreviewData$),
        tap(([, data]) => {
          this._createMessageService.openMessagePreview<TextPreviewComponent, Partial<TextPreviewDataModel>>(TextPreviewComponent, data);
        })
      ),
    { dispatch: false }
  );

  openEmailMessagePreview$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(openEmailPreview),
        withLatestFrom(this._createMessageFacade.emailPreviewData$),
        tap(([, data]) => {
          this._createMessageService.openMessagePreview<EmailPreviewComponent, Partial<EmailPreviewDataModel>>(EmailPreviewComponent, data);
        })
      ),
    { dispatch: false }
  );

  saveAndContinueWithPreviousMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveAndContinueWithPreviousMessage),
      withLatestFrom(this._createMessageFacade.messageId$),
      switchMap(([action, messageId]) => {
        return [showLoader(), setNotificationId({ messageId: action.messageId }), queueCommunication(), updateCommunicationQueue()];
      })
    )
  );

  submitMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(submitNewMessage),
      withLatestFrom(
        this._createMessageFacade.messageId$,
        this._userFacade.userId$,
        this._createMessageFacade.message$,
        this._createMessageFacade.messageFormats$
      ),
      switchMap(([action, _, userId, message, messageFormats]) => {
        if (action.createCommunication) {
          return this._createMessageService.createMessageRecord(userId, message, messageFormats).pipe(
            switchMap((messageId) => {
              return [setNotificationId({ messageId }), queueCommunication()];
            }),
            catchError(() => {
              this._createMessageService.openErrorSnackbar('Something went wrong creating a message. Please, try again later.');

              return of(removeLoader());
            })
          );
        }

        return [setNotificationId({ messageId: action.messageId }), queueCommunication()];
      })
    )
  );

  saveMessageInLibrary$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveMessageInLibrary),
      switchMap(() => [showLoader(), createMessageRecord()])
    )
  );

  createMessageRecord$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createMessageRecord),
      withLatestFrom(
        this._userFacade.userId$,
        this._createMessageFacade.message$,
        this._createMessageFacade.messageId$,
        this._createMessageFacade.messageFormats$
      ),
      switchMap(([action, userId, message, _, messageFormats]) =>
        this._createMessageService.createMessageRecord(userId, message, messageFormats).pipe(
          switchMap((response) => {
            this._createMessageService.openSuccessSnackbar('Message created successfully');
            return [removeLoader(), createMessageSuccess({ messageId: response })];
          }),
          catchError(() => {
            this._createMessageService.openErrorSnackbar('Something went wrong creating a message. Please, try again later.');
            return [removeLoader(), createMessageFailure()];
          })
        )
      )
    )
  );

  createMessageRecordFromLibrary$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createMessageRecordFromLibrary),
      withLatestFrom(
        this._userFacade.userId$,
        this._createMessageFacade.message$,
        this._createMessageFacade.messageId$,
        this._createMessageFacade.messageFormats$
      ),
      switchMap(([action, userId, message, _, messageFormats]) =>
        this._createMessageService.createMessageRecord(userId, message, messageFormats).pipe(
          switchMap((messageId) =>
            this._confirmDialogService
              .showDialog({
                confirmBtn: 'YES',
                header: 'Message Created',
                detail: 'Congratulations! Your message has been created and saved to your message library!',
                secondaryDetail: 'Would you like to send or schedule your message now?',
                cancelBtn: 'NO',
              })
              .pipe(
                switchMap((response) => {
                  if (!response) {
                    this._router.navigate(['messages', 'library']);
                    return [removeLoader(), resetStore()];
                  }

                  this._router.navigate(['new-communication', 'details']);
                  return [setPreviousMessage({ id: messageId }), resetStore()];
                })
              )
          )
        )
      )
    )
  );

  setNotificationFormatValue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setTextValid, setEmailValid, setVoiceValid),
      withLatestFrom(
        this._createMessageFacade.voiceValid$,
        this._createMessageFacade.emailValid$,
        this._createMessageFacade.textValid$,
        this._createMessageFacade.messageNameData$
      ),
      map(([_, voiceValid, emailValid, textValid, messageData]) => {
        let newFormat: NotificationFormatValues = messageData.notificationFormatValue;

        if (textValid && voiceValid && emailValid) {
          newFormat = NotificationFormatValues.AllMessages;
        }

        if (textValid && !voiceValid && !emailValid) {
          newFormat = NotificationFormatValues.TextMessage;
        }

        if (!textValid && !voiceValid && emailValid) {
          newFormat = NotificationFormatValues.EmailMessage;
        }

        if (!textValid && voiceValid && !emailValid) {
          newFormat = NotificationFormatValues.VoiceMessage;
        }

        if (!textValid && voiceValid && emailValid) {
          newFormat = NotificationFormatValues.VoiceEmail;
        }

        if (textValid && voiceValid && !emailValid) {
          newFormat = NotificationFormatValues.VoiceText;
        }

        if (textValid && !voiceValid && emailValid) {
          newFormat = NotificationFormatValues.TextEmail;
        }

        return setNotificationFormatValue({
          notificationFormatValue: newFormat,
        });
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _userFacade: UserFacade,
    private _router: Router,
    private _createMessageFacade: CreateMessageFacade,
    private _createMessageService: CreateMessageService,
    private _confirmDialogService: ConfirmDialogService
  ) {}
}
