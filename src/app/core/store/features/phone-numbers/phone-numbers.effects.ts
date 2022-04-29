import { Injectable, Pipe } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, forkJoin } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PhoneNumbersService } from 'src/app/api/phone-numbers/phone-numbers.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';

import { removeLoader } from '../loader/loader.actions';
import {
  deleteAllPhoneNumbers,
  deleteSelectedPhoneNumbers,
  getAllPhoneNumbersError,
  getAllPhoneNumbersResolve,
  getAllPhoneNumbersStart,
  setPhoneNumbers,
  showDeleteSelection,
  singlePhoneNumberDelete
} from './phone-numbers.actions';
import { PhoneNumbers } from './phone-numbers.models';
import { PhoneNumbersFacade } from './phone-numbers.facade';
import { TwilioService } from 'src/app/api/twilio/twilio.service';


@Injectable({
  providedIn: 'root'
})
export class PhoneNumbersEffects {

  getAllPhoneNumbers$ = createEffect(() => this._actions$.pipe(
    ofType(getAllPhoneNumbersStart),
    switchMap(() => this._phoneNumbersService.getAllPhoneNumbers()
      .pipe(
        switchMap((phoneNumbers: PhoneNumbers[]) => {
          return [getAllPhoneNumbersResolve({ phoneNumbers: phoneNumbers.map(s => ({
            ...s
          }) as PhoneNumbers) })];
        }),
        catchError(() => of(getAllPhoneNumbersError()))
      ))
  ));

  deleteAllPhoneNumbers$ = createEffect(() =>
  this._actions$.pipe(
    ofType(deleteAllPhoneNumbers),
    switchMap(() =>
      this._twilioService.deleteAllTwilioPhoneNumbers().pipe(
        switchMap(() => [removeLoader(), setPhoneNumbers({ phoneNumbers: [] })]),
        catchError((e) => {
          this._toastService.addToast(
            ToastType.Error,
            'Something went wrong deleting phone numbers.',
          );

          console.error(e);

          return of(removeLoader());
        }),
      ),
    ),
  ),
);

  deleteSelectedPhoneNumbers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteSelectedPhoneNumbers),
      withLatestFrom(
        this._phoneNumbersFacade.phoneNumbersToDelete$,
        this._phoneNumbersFacade.allPhoneNumbers$
      ),
      switchMap(([_, phoneNumberIds, existingPhoneNumbers]) => {
        const phoneNumbersDeleteRequests = phoneNumberIds.map((id) =>
          this._twilioService.deleteTwilioPhoneNumber(id)
        );

        return forkJoin(phoneNumbersDeleteRequests).pipe(
          switchMap(() => [
            setPhoneNumbers({
              phoneNumbers: existingPhoneNumbers.filter(
                (phoneNumber) => !phoneNumber.flaggedForDeletion
              )
            }),
            showDeleteSelection({ show: false }),
            removeLoader(),
          ]),
          catchError((error) => {
            this._toastService.addToast(
              ToastType.Error,
              'Something went wrong deleting phone numbers.',
            );

            console.error(error);

            return of(removeLoader());
          }),
        );
      }),
    ),
  );

  singlePhoneNumberDelete$ = createEffect(() =>
  this._actions$.pipe(
    ofType(singlePhoneNumberDelete),
    withLatestFrom(this._phoneNumbersFacade.allPhoneNumbers$),
    switchMap(([action, existingPhoneNumbers]) =>
    this._twilioService.deleteTwilioPhoneNumber(action.id).pipe(
        switchMap(() => [
          setPhoneNumbers({
            phoneNumbers: existingPhoneNumbers.filter(
              (phoneNumber) => phoneNumber.id !== action.id
            )
          }),
          removeLoader(),
        ]),
      ),
    ),
    catchError((error) => {
      this._toastService.addToast(
        ToastType.Error,
        'Something went wrong deleting phone number.',
      );

      console.error(error);

      return of(removeLoader());
    }),
  ),
);



  constructor(
    private _actions$: Actions,
    private _phoneNumbersService: PhoneNumbersService,
    private _toastService: ToastService,
    private _phoneNumbersFacade: PhoneNumbersFacade,
    private _twilioService: TwilioService
    ) {}
}
