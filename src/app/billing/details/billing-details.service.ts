import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BasePaymentProfile } from 'src/app/api/financials/financials.models';
import { FinancialsService } from 'src/app/api/financials/financials.service';

@Injectable()
export class BillingDetailsService {
  constructor(private _financialsService: FinancialsService) {}

  fetchPaymentProfiles(
    customerProfileId: number,
  ): Observable<BasePaymentProfile[]> {
    return this._financialsService.getPaymentProfiles(customerProfileId, true);
  }
}
