import { Injectable } from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAccountOverviewStart,
  getAccountOverViewResolve,
} from './account-overview.actions';

import { AccountOverviewMembersResponse } from './account-overview.model';

import { MemberService } from '@api/members/members.service';

@Injectable({
  providedIn: 'root',
})
export class AccountOverviewEffects {
  constructor(
    private actions$: Actions,
    private _memberService: MemberService
  ) {}

  getAccountOverviewStart = createEffect(() =>
    this.actions$.pipe(
      ofType(getAccountOverviewStart),
      switchMap(({ filter }) =>
        this._memberService.searchMyContacts(filter).pipe(
          switchMap((overview: AccountOverviewMembersResponse) => {
            return [
              getAccountOverViewResolve({
                totalGroupMembers: overview.totalGroupMembers,
                totalActiveAddresses: overview.totalActiveAddresses,
                totalActivePhoneNumbers: overview.totalActivePhoneNumbers,
                totalActiveEmailAddresses: overview.totalActiveEmailAddresses,
              }),
            ];
          })
        )
      )
    )
  );
}
