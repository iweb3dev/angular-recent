import { createAction, props } from '@ngrx/store';

import { RequestPagingFiltering } from '@api/members/members.models';

export const getAccountOverviewStart = createAction(
  '[Account Overview] Get Start',
  props<{ filter: RequestPagingFiltering }>()
);
export const getAccountOverViewResolve = createAction(
  '[Account Overview] Get Resolve',
  props<{
    totalGroupMembers: number;
    totalActiveAddresses: number;
    totalActivePhoneNumbers: number;
    totalActiveEmailAddresses: number;
  }>()
);
