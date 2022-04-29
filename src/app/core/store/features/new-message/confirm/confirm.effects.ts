import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { removeLoader } from 'src/app/core/store/features/loader/loader.actions';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { fetchCommunicationSearch } from 'src/app/message-results/message-results-detail/store/message-results-detail.actions';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { hasPhoneFormat } from 'src/app/shared/utils/message/notification-format.helper';
import {
  hasValue,
  nonValue,
} from 'src/app/shared/utils/verifications/value-check';
import { fetchUser } from '../../user/user.actions';
import {
  createCommunicationFailure,
  createCommunicationSuccess,
  queueCommunication,
  resetCreateMessageState,
  updateCommunicationQueue,
} from '../new-message.actions';
import { NewMessageFacade } from '../new-message.facade';

import {
  communicationCancel,
  communicationConfirm,
  fetchCommunicationQueue,
  fetchPhoneMessageLength,
  scheduleMessage,
  setCommunicationQueue,
  setPhoneMessageLength,
  setScheduleOptions,
  setUserSystemSettings,
} from './confirm.actions';
import { ConfirmFacade } from './confirm.facade';
import { MessageConfirmService } from './message-confirm.service';

const NO_ENDPOINTS_ERROR_STRING = 'No endpoints to build the communication';

@Injectable()
export class ConfirmEffects {
  queueCommunication$ = createEffect(() =>
    this._actions$.pipe(
      ofType(queueCommunication),
      withLatestFrom(
        this._newMessageFacade.messageState$,
        this._confirmFacade.communicationId$,
      ),
      filter(([, , communicationId]) => nonValue(communicationId)),
      switchMap(([_, messageState]) =>
        this._messageConfirmService.fetchUserSettings().pipe(
          switchMap((settings) => {
            if (hasPhoneFormat(messageState.notificationFormatValue)) {
              return [
                setUserSystemSettings({ settings }),
                fetchPhoneMessageLength({
                  messageId: messageState.messageId,
                  formatId: messageState.notificationFormatValue,
                }),
              ];
            }

            return [
              setUserSystemSettings({ settings }),
              fetchCommunicationQueue(),
            ];
          }),
        ),
      ),
    ),
  );

  fetchPhoneMessageLength$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchPhoneMessageLength),
      switchMap(({ messageId, formatId }) =>
        this._messageConfirmService
          .fetchPhoneMessageLength(messageId, 1) // Possibly formatId
          .pipe(
            switchMap((length) => [
              setPhoneMessageLength({ phoneMessageLength: length }),
              fetchCommunicationQueue(),
            ]),
          ),
      ),
    ),
  );

  fetchCommunicationQueue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchCommunicationQueue),
      withLatestFrom(
        this._newMessageFacade.messageState$,
        this._userFacade.userPackage$,
        this._confirmFacade.userSystemSettings$,
        this._confirmFacade.phoneMessageLength$,
      ),
      switchMap(
        ([_, messageState, userPackage, settings, phoneMessageLength]) => {
          const queuePayload =
            this._messageConfirmService.createCommunicationQueuePayload(
              messageState,
              userPackage,
              phoneMessageLength,
              null,
              settings,
            );

          return this._messageConfirmService
            .createCommunicationQueue(queuePayload)
            .pipe(
              switchMap((queue) => {
                const hasNoEndpointsError =
                  queue.exceptions.length &&
                  queue.exceptions.some((exception) =>
                    exception.exceptionMessage.includes(
                      NO_ENDPOINTS_ERROR_STRING,
                    ),
                  );

                if (hasNoEndpointsError) {
                  this._messageConfirmService.openErrorSnackbar(
                    'No valid phone numbers or email addresses exist to queue this communication.',
                  );

                  return [
                    removeLoader(),
                    resetCreateMessageState(),
                    createCommunicationFailure(),
                  ];
                }

                this._messageConfirmService.openSuccessSnackbar(
                  'Message queue successfully created!',
                );

                return [
                  setCommunicationQueue({ queue }),
                  communicationConfirm(),
                ];
              }),
              catchError((error) => {
                let errorMessage =
                  'Something went wrong creating communication queue. Please, try again later.';

                if (Array.isArray(error?.error)) {
                  errorMessage = error.error[0];
                }

                this._messageConfirmService.openErrorSnackbar(errorMessage);

                return of(
                  removeLoader(),
                  resetCreateMessageState(),
                  createCommunicationFailure(),
                );
              }),
            );
        },
      ),
    ),
  );

  confirmCommunication$ = createEffect(() =>
    this._actions$.pipe(
      ofType(communicationConfirm),
      withLatestFrom(
        this._newMessageFacade.messageState$,
        this._confirmFacade.communicationId$,
        this._confirmFacade.phoneMessageLength$,
        this._userFacade.userPackage$,
        this._confirmFacade.scheduleOptions$,
        this._confirmFacade.userSystemSettings$,
      ),
      switchMap(
        ([
          _,
          messageState,
          communicationId,
          phoneMessageLength,
          userPackage,
          scheduleTime,
          settings,
        ]) => {
          const queuePayload =
            this._messageConfirmService.createCommunicationQueuePayload(
              messageState,
              userPackage,
              phoneMessageLength,
              scheduleTime,
              settings,
            );

          return this._messageConfirmService
            .confirmCommunicationQueue(communicationId, queuePayload)
            .pipe(
              switchMap(() =>
                this._messageConfirmService
                  .setCommunicationConfirmed(communicationId)
                  .pipe(
                    switchMap(() => [
                      removeLoader(),
                      createCommunicationSuccess(),
                      fetchUser(),
                    ]),
                  ),
              ),
              catchError(() => {
                this._messageConfirmService.openErrorSnackbar(
                  'Error confirming communication',
                );

                return of(removeLoader(), createCommunicationFailure());
              }),
            );
        },
      ),
    ),
  );

  cancelCommunication$ = createEffect(() =>
    this._actions$.pipe(
      ofType(communicationCancel),
      switchMap(
        ({
          communicationId,
          searchCriteria,
          groupId,
          historyTypeId,
          pageSize,
          pageIndex,
        }) =>
          this._messageConfirmService
            .setCommunicationCancel(communicationId)
            .pipe(
              map((res: boolean) => {
                this._toastService.addToast(
                  ToastType.Success,
                  `Message cancelled`,
                );
                return fetchCommunicationSearch({
                  searchCriteria,
                  groupId,
                  historyTypeId,
                  pageSize,
                  pageIndex,
                });
              }),
              catchError(() => {
                this._toastService.addToast(
                  ToastType.Error,
                  'Unfortunately, Message is not cancelled.',
                );
                return of(fetchCommunicationSearch({ searchCriteria: '' }));
              }),
            ),
      ),
    ),
  );

  scheduleMessage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(scheduleMessage),
      switchMap(({ isMobileView }) =>
        this._messageConfirmService.openDatePicker(isMobileView).pipe(
          filter((data) => !!data),
          map((scheduleOptions) => setScheduleOptions({ scheduleOptions })),
        ),
      ),
    ),
  );

  updateCommunicationQueue$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateCommunicationQueue),
      withLatestFrom(
        this._newMessageFacade.messageState$,
        this._confirmFacade.communicationId$,
        this._confirmFacade.phoneMessageLength$,
        this._userFacade.userPackage$,
        this._confirmFacade.scheduleOptions$,
        this._confirmFacade.userSystemSettings$,
      ),
      filter((value) => hasValue(value[2])),
      switchMap(
        ([
          ,
          messageState,
          communicationId,
          phoneMessageLength,
          userPackage,
          scheduleTime,
          settings,
        ]) => {
          const queuePayload =
            this._messageConfirmService.createCommunicationQueuePayload(
              messageState,
              userPackage,
              phoneMessageLength,
              scheduleTime,
              settings,
            );

          return this._messageConfirmService
            .updateCommunicationInQueue(communicationId, queuePayload)
            .pipe(
              map(() => {
                this._messageConfirmService.openSuccessSnackbar(
                  'Communication in queue has been successfully updated.',
                );

                return removeLoader();
              }),
              catchError(() => {
                this._messageConfirmService.openErrorSnackbar(
                  'Error updating communication in queue.',
                );

                return of(removeLoader());
              }),
            );
        },
      ),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _userFacade: UserFacade,
    private _confirmFacade: ConfirmFacade,
    private _newMessageFacade: NewMessageFacade,
    private _messageConfirmService: MessageConfirmService,
    private _toastService: ToastService,
  ) {}
}
