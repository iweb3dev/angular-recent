import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { removeLoader } from 'src/app/core/store/features/loader/loader.actions';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { PaymentManagerService } from 'src/app/domain/payment/payment-manager/payment-manager.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

import { BillingPaymentProfile } from '../details/billing-details.models';

import {
  createPaymentProfile,
  deleteProfile,
  setPaymentProfiles,
  updatePaymentProfile,
} from './billing.actions';
import { BillingFacade } from './billing.facade';

@Injectable()
export class BillingEffects {
  createPaymentProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(createPaymentProfile),
      withLatestFrom(this._userFacade.currentUserInfo$),
      switchMap(([action, userData]) =>
        this._paymentManagerService
          .createNewProfile(action.data, userData)
          .pipe(
            switchMap((profiles: BillingPaymentProfile[]) => [
              setPaymentProfiles({ profiles }),
              removeLoader(),
            ]),
            catchError(({ error }) => {
              const [errorMessage] = error;
              this._toastService.createValidatorToast(errorMessage);

              return of(removeLoader());
            }),
          ),
      ),
    ),
  );

  deleteProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteProfile),
      withLatestFrom(
        this._userFacade.customerProfileId$,
        this._billingFacade.paymentProfiles$,
      ),
      switchMap(([action, customerProfileId, profiles]) =>
        this._paymentManagerService
          .deletePaymentProfile(
            action.profile.paymentProfileID,
            customerProfileId,
          )
          .pipe(
            switchMap(() => [
              setPaymentProfiles({
                profiles: profiles.filter(
                  (profile) => profile.id !== action.profile.id,
                ),
              }),
              removeLoader(),
            ]),
          ),
      ),
    ),
  );

  updatePaymentProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updatePaymentProfile),
      switchMap(({ data, profile }) => {
        const payload =
          this._paymentManagerService.createPaymentProfileUpdateRequest(
            {
              ...profile,
              customerProfileID: profile.customerProfileID,
              expirationNotice: profile.expirationNotice,
            },
            data,
          );

        return this._paymentManagerService
          .updatePaymentProfile(profile.paymentProfileID, payload)
          .pipe(
            switchMap((profiles: BillingPaymentProfile[]) => [
              setPaymentProfiles({ profiles }),
              removeLoader(),
            ]),
            tap(() =>
              this._toastService.addToast(
                ToastType.Success,
                'Profile has been successfully updated.',
              ),
            ),
            catchError((error) => {
              console.error(error);
              this._toastService.addToast(
                ToastType.Error,
                'Something went wrong when updating payment profile.',
              );

              return of(removeLoader());
            }),
          );
      }),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _userFacade: UserFacade,
    private _toastService: ToastService,
    private _billingFacade: BillingFacade,
    private _paymentManagerService: PaymentManagerService,
  ) {}
}
