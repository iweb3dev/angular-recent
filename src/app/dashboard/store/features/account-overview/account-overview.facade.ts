import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getAccountOverviewStart } from './account-overview.actions';
import {
  getAccountOverview,
  getAccountOverviewHasLoaded,
} from './account-overview.selector';

import { RequestPagingFiltering } from '@api/members/members.models';

@Injectable({
  providedIn: 'root',
})
export class AccountOverviewFacade {
  accountOverview$ = this._store.select(getAccountOverview);
  hasLoaded$ = this._store.select(getAccountOverviewHasLoaded);

  constructor(private _store: Store<AppState>) {}

  getAccountOverview = (filter: RequestPagingFiltering) =>
    this._store.dispatch(
      getAccountOverviewStart({
        filter,
      })
    )
}
