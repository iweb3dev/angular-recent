import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { MatDialogConfig } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store/src/models';
import { Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AudioRecorderService } from 'src/app/core/services/audio-recorder-service/audio-recorder.service';
import {
  removeLoader,
  showLoader,
} from 'src/app/core/store/features/loader/loader.actions';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { CallMeService } from 'src/app/domain/call-me/call-me.service';
import { VerifyPhoneDialogService } from 'src/app/shared/components/verify-phone/services/verify-phone-dialog.service';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';
import { PhoneMessageSourceTypes } from 'src/app/shared/models/message/message.models';
import { CallInDialogComponent } from '../call-in/dialog/call-in-dialog.component';
import { CallInSheetComponent } from '../call-in/sheet/call-in-sheet.component';
import { MicrophoneDialogComponent } from '../microphone/dialog/microphone-dialog.component';
import { MicrophoneSheetComponent } from '../microphone/sheet/microphone-sheet.component';
import { TtsDialogComponent } from '../tts/dialog/tts-dialog.component';
import { TtsSheetComponent } from '../tts/sheet/tts-sheet.component';
import { UploadDialogComponent } from '../upload/dialog/upload-dialog.component';
import { UploadSheetComponent } from '../upload/sheet/upload-sheet.component';
import { VoiceMessageService } from '../voice-message.service';
import {
  cancelCallIn,
  closeMicrophoneRecordDialog,
  initiateCallIn,
  initiateRecording,
  openCallInDialog,
  openFilaUploadDialog,
  openMicrophoneDialog,
  openTTSDialog,
  openVoiceDialog,
  phoneNumberVerify,
  setCallInId,
  setCallMeRecordingStatus,
  setFileUploadedMessage,
  setIsTTSCompleted,
  setMicrophonePlayBack,
  setPhoneTTSMessage,
  setTtsPlayBack,
  setUploadPlayBack,
  startMicrophoneRecording,
  stopMicrophoneRecording,
  toggleIsRecordingTimer,
  togglePauseResume,
} from './voice.actions';

@Injectable()
export class VoiceEffects {
  microphoneRecording$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initiateRecording),
      switchMap(() =>
        this._audioRecorderService.requestMicrophone().pipe(
          switchMap((stream: MediaStream) => [
            startMicrophoneRecording({ stream }),
            toggleIsRecordingTimer({ isMicrophoneRecording: true }),
          ]),
          catchError((_) => {
            this._voiceMessageService.openErrorSnackbar(
              'Permission to the microphone denied. Please, allow microphone permission and refresh browser page.'
            );

            return of(closeMicrophoneRecordDialog({ closed: true }));
          })
        )
      )
    )
  );

  startMicrophoneAudioRecording$ = createEffect(() =>
    this._actions$.pipe(
      ofType(startMicrophoneRecording),
      switchMap(({ stream }) =>
        this._audioRecorderService.createAudioRecording(stream, 1000).pipe(
          switchMap((blob: Blob) => [
            showLoader(),
            setMicrophonePlayBack({
              blob,
              fileUrl: URL.createObjectURL(blob),
            }),
          ])
        )
      )
    )
  );

  uploadMicrophoneFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setMicrophonePlayBack),
      withLatestFrom(this._userFacade.userId$),
      switchMap(([recording, id]) =>
        this._audioRecorderService.convertToBase64(recording.blob).pipe(
          switchMap((base64) =>
            this._voiceMessageService.uploadMicrophoneFile(base64, id).pipe(
              switchMap((message) => [
                removeLoader(),
                setFileUploadedMessage({
                  messageSource: PhoneMessageSourceTypes.Microphone,
                  ['phoneMicrophoneMessage']: message,
                  ['phoneUploadedMessage']: {
                    id: null,
                    size: null,
                    fileName: null,
                    fileExtension: null,
                  },
                }),
              ]),
              catchError((_) => {
                this._voiceMessageService.openErrorSnackbar(
                  'Something went wrong saving file. Please, try again later'
                );

                return of(removeLoader());
              })
            )
          )
        )
      )
    )
  );

  pauseMicrophoneRecording$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(togglePauseResume),
        tap(({ isPaused }) => {
          if (isPaused) {
            this._audioRecorderService.pauseRecording();
          } else {
            this._audioRecorderService.resumeRecording();
          }
        })
      ),
    { dispatch: false }
  );

  stopRecording$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(stopMicrophoneRecording),
        tap(() => this._audioRecorderService.stopRecording())
      ),
    { dispatch: false }
  );

  initiateCallIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(initiateCallIn),
      withLatestFrom(this._userFacade.userId$),
      switchMap(([phone, userId]) =>
        this._callMeService
          .initiateCallIn({
            phoneNumber: phone.phoneNumberDetails.phoneNumber,
            extension: phone.phoneNumberDetails.extension,
            userID: userId,
          })
          .pipe(
            switchMap(({ status, callId }) => [
              setCallMeRecordingStatus({ status }),
              setCallInId({ id: callId }),
            ])
          )
      )
    )
  );

  cancelCallIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cancelCallIn),
      tap(() => this._callMeService.stopPolling()),
      map(() =>
        setCallMeRecordingStatus({
          status: CallMeRecordingStatuses.FinishedNoRecording,
        })
      )
    )
  );

  openVoiceDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openVoiceDialog),
      switchMap(({ messageSource, mobileView, injectorData }) => [
        openPhoneMessageSource(messageSource, mobileView, injectorData),
      ])
    )
  );

  openCallInDialog$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(openCallInDialog),
        tap(({ mobileView }) => {
          this.createDialog<CallInDialogComponent, CallInSheetComponent, null>(
            mobileView,
            CallInDialogComponent,
            CallInSheetComponent,
            {
              height: 'min-content',
              width: '400px',
            }
          );
        })
      ),
    { dispatch: false }
  );

  openTTSDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openTTSDialog),

      switchMap(({ mobileView, injectorData }) => {
        return this.createDialog<TtsDialogComponent, TtsSheetComponent, string>(
          mobileView,
          TtsDialogComponent,
          TtsSheetComponent,
          {
            width: '400px',
            height: 'min-content',
            data: { ...injectorData },
          }
        ).pipe(
          filter((value) => !!value),
          switchMap((message) => [
            setIsTTSCompleted({ isTTSCompleted: false }),
            setTtsPlayBack({ fileUrl: null }),
            setPhoneTTSMessage({ message }),
          ])
        );
      })
    )
  );

  setPhoneTTSMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setPhoneTTSMessage),
      switchMap(({ message }) =>
        this._voiceMessageService
          .fetchTtsVoiceData(message)
          .pipe(map((fileUrl) => setTtsPlayBack({ fileUrl })))
      )
    )
  );

  openFilaUploadDialog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(openFilaUploadDialog),
      switchMap(({ mobileView }) =>
        this.createDialog<UploadDialogComponent, UploadSheetComponent, File>(
          mobileView,
          UploadDialogComponent,
          UploadSheetComponent
        ).pipe(
          filter((file) => !!file),
          switchMap((file) => [
            showLoader(),
            setUploadPlayBack({
              blob: file,
              fileUrl: URL.createObjectURL(file),
            }),
          ])
        )
      )
    )
  );

  uploadWavLoadedFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(setUploadPlayBack),
      withLatestFrom(this._userFacade.userId$),
      switchMap(([audio, userId]) =>
        this._voiceMessageService.uploadWavFile(audio.blob, userId).pipe(
          switchMap((message) => [
            removeLoader(),
            setFileUploadedMessage({
              messageSource: PhoneMessageSourceTypes.Upload,
              ['phoneUploadedMessage']: message,
              ['phoneMicrophoneMessage']: {
                id: null,
                size: null,
                fileName: null,
                fileExtension: null,
              },
            }),
          ]),
          catchError((_) => {
            this._voiceMessageService.openErrorSnackbar(
              'Something went wrong saving file. Please, try again later'
            );

            return of(removeLoader());
          })
        )
      )
    )
  );

  openMicrophoneDialog$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(openMicrophoneDialog),
        tap(({ mobileView }) => {
          this.createDialog<
            MicrophoneDialogComponent,
            MicrophoneSheetComponent,
            null
          >(mobileView, MicrophoneDialogComponent, MicrophoneSheetComponent, {
            height: '320px',
            width: '400px',
          });
        })
      ),
    { dispatch: false }
  );

  phoneNumberVerify$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(phoneNumberVerify),
        tap(() => this._verifyPhoneDialogService.showVerifyPhoneDialog())
      ),
    { dispatch: false }
  );

  private createDialog<T, F, R>(
    mobileView: boolean,
    desktopComponent: ComponentType<T>,
    mobileComponent: ComponentType<F>,
    options = {} as MatDialogConfig | MatBottomSheetConfig
  ): Observable<R> {
    if (mobileView) {
      return this._voiceMessageService
        .openVoiceMessageBottomSheet(
          mobileComponent,
          options as MatBottomSheetConfig
        )
        .afterDismissed();
    } else {
      return this._voiceMessageService
        .openVoiceMessageDialog(desktopComponent, options)
        .afterClosed();
    }
  }

  constructor(
    private _actions$: Actions,
    private _userFacade: UserFacade,
    private _callMeService: CallMeService,
    private _voiceMessageService: VoiceMessageService,
    private _audioRecorderService: AudioRecorderService,
    private _verifyPhoneDialogService: VerifyPhoneDialogService
  ) {}
}

function openPhoneMessageSource(
  messageSource: PhoneMessageSourceTypes,
  mobileView: boolean,
  injectorData: any
): Action {
  switch (messageSource) {
    case PhoneMessageSourceTypes.CallIn:
      return openCallInDialog({ mobileView });
    case PhoneMessageSourceTypes.TTS:
      return openTTSDialog({ mobileView, injectorData });
    case PhoneMessageSourceTypes.Upload:
      return openFilaUploadDialog({ mobileView });
    case PhoneMessageSourceTypes.Microphone:
      return openMicrophoneDialog({ mobileView });
  }
}
