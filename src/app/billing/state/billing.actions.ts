import { createAction, props } from '@ngrx/store';

import { PaymentProfile } from 'src/app/api/financials/financials.models';
import { BillingPaymentProfile } from '../details/billing-details.models';

export const fetchPaymentProfiles = createAction(
  '[Billing Actions] Fetch Payment Profiles',
  props<{ profileId: number }>(),
);

export const setPaymentProfiles = createAction(
  '[Billing Actions] Set Payment Profiles',
  props<{ profiles: BillingPaymentProfile[] }>(),
);

export const createPaymentProfile = createAction(
  '[Billing Actions] Create New Payment',
  props<{ data: Partial<PaymentProfile> }>(),
);

export const deleteProfile = createAction(
  '[Billing Actions] Delete Profile',
  props<{ profile: BillingPaymentProfile }>(),
);

export const updatePaymentProfile = createAction(
  '[Billing Actions] Update Profile',
  props<{
    data: Partial<PaymentProfile>;
    profile: BillingPaymentProfile;
  }>(),
);

export const searchHistory = createAction(
  '[Billing Actions] History Search',
  props<{ value: string }>(),
);

export const resetSearch = createAction('[Billing Actions] Reset Search');
