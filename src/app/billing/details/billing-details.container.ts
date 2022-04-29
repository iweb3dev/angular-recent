import { Component, OnInit } from '@angular/core';
import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';

import { UserFacade } from 'src/app/core/store/features/user/user.facade';

import { BillingFacade } from '../state/billing.facade';
import { BillingPaymentProfile } from './billing-details.models';

@Component({
  selector: 'app-billing-details-container',
  templateUrl: './billing-details.container.html',
  styleUrls: ['./billing-details.component.scss'],
})
export class BillingDetailsContainerComponent implements OnInit {
  paymentProfiles$ = this._billingFacade.paymentProfiles$;
  loadingProfiles$ = this._billingFacade.loadingProfiles$;
  userInfo$ = this._userFacade.currentUserInfo$;

  constructor(
    private _billingFacade: BillingFacade,
    private _userFacade: UserFacade,
    private _loaderFacade: LoaderFacade,
  ) {}

  ngOnInit(): void {}

  onPaymentProfileCreate(data: Partial<PaymentProfile>): void {
    this._loaderFacade.showLoader();
    this._billingFacade.createPaymentProfile(data);
  }

  onProfileDelete(profile: BillingPaymentProfile): void {
    this._loaderFacade.showLoader();
    this._billingFacade.deleteProfile(profile);
  }

  onPaymentUpdate(data: {
    data: Partial<PaymentProfile>;
    profile: BillingPaymentProfile;
  }): void {
    this._loaderFacade.showLoader();
    this._billingFacade.updatePaymentProfile(data);
  }
}
