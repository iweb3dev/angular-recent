import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, merge } from 'rxjs';
import { map, shareReplay, take, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/store/app-state';
import {
  getAllOrganizationLookupsStart,
  getAllTimeZoneLookupsStart,
  getHelpTopicStart,
  getLookupSettingByIdStart
} from './lookups.actions';
import {
  getAllGlobalLookupSettings,
  getAllHelpTopics,
  getAllTimeZoneLookups,
  getGlobalLookupSettingById,
  getHelpTopicById,
  getOrganizationTypesLookups
} from './lookups.selectors';


@Injectable({
  providedIn: 'root'
})
export class LookupsFacade {

  organizationTypes$ = this._store.select(getOrganizationTypesLookups);
  timeZones$ = this._store.select(getAllTimeZoneLookups);
  helpTopics$ = this._store.select(getAllHelpTopics);
  globalLookupSettings$ = this._store.select(getAllGlobalLookupSettings);

  constructor(private _store: Store<AppState>) {}

  getOrganizationLookups() {
    this._store.dispatch(getAllOrganizationLookupsStart());
  }

  getAllTimeZoneLookups() {
    this._store.dispatch(getAllTimeZoneLookupsStart());
  }

  fetchHelpTopicById(id: string) {
    this._store.dispatch(getHelpTopicStart({ helpTopicId: id}));
  }

  fetchGlobalSettingById(id: string) {
    this._store.dispatch(getLookupSettingByIdStart({ id: id }));
  }

  getHelpTopicById(id: string) {
    return this._store.select(getHelpTopicById).pipe(
      take(1),
      map((func) => func(id))
    );
  }

  getHelpTopicByIdWithCange(id: string) {
    return merge(this.helpTopics$, this._store.select(getHelpTopicById))
    .pipe(
      withLatestFrom(this._store.select(getHelpTopicById)),
      map(([_, func]) => func(id))
    );
  }

  getGlobalLookupSettingById(id: string) {
    return merge(this.globalLookupSettings$, this._store.select(getGlobalLookupSettingById))
    .pipe(
      withLatestFrom(this._store.select(getGlobalLookupSettingById)),
      map(([_, func]) => func(id))
    );
  }
}
