import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';

import { BillingFacade } from '../state/billing.facade';
import { BillingPaymentProfile } from './billing-details.models';
import { BillingDetailsService } from './billing-details.service';

@Injectable()
export class BillingDetailsResolver implements Resolve<void> {
  constructor(
    private _billingFacade: BillingFacade,
    private _billingDetailsService: BillingDetailsService,
    private _userFacade: UserFacade,
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void {
    this._userFacade.customerProfileId$
      .pipe(
        filter((id) => hasValue(id)),
        take(1),
        switchMap((id) => {
          // 0 when account is only created
          if (id === 0) {
            return of([]);
          }

          return this._billingDetailsService.fetchPaymentProfiles(id);
        }),
      )
      .subscribe((profiles) =>
        this._billingFacade.setPaymentProfiles(
          profiles as BillingPaymentProfile[],
        ),
      );
  }
}
