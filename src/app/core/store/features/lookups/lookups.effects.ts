import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, switchMap } from 'rxjs/operators';
import { LookupsService } from 'src/app/api/lookups/lookups.service';
import {
  getAllOrganizationLookupsResolve,
  getAllOrganizationLookupsStart,
  getAllTimeZoneLookupsResolve,
  getAllTimeZoneLookupsStart,
  getHelpTopicError,
  getHelpTopicResolve,
  getHelpTopicStart,
  getLookupSettingByIdError,
  getLookupSettingByIdResolve,
  getLookupSettingByIdStart
} from './lookups.actions';
import { HelpTopic, OrganizationType, TimeZone } from './lookups.models';

@Injectable({ providedIn: 'root' })
export class LookupsEffects {
  constructor(
    private actions$: Actions,
    private _lookupsService: LookupsService) {}

  getAllOrganizationTypesStart = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllOrganizationLookupsStart),
      switchMap(() =>
        this._lookupsService.getAllOrganizationTypes().pipe(
          switchMap((res: {}[]) => [getAllOrganizationLookupsResolve({ organizationTypes: res.map(r => new OrganizationType({ ...r }))})])
        )
      )
    )
  );

  getAllTimeZoneLookupsStart = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTimeZoneLookupsStart),
      switchMap(() => this._lookupsService.getAllTimeZones().pipe(
        switchMap((res: {}[]) => [getAllTimeZoneLookupsResolve({ timeZones: res.map(r => new TimeZone({ ...r }))})])
      ))
    )
  );

  getHelpTopicStart = createEffect(() => this.actions$.pipe(
    ofType(getHelpTopicStart),
    concatMap(({ helpTopicId }) => this._lookupsService.getHelpTopic(helpTopicId).pipe(
      switchMap(({ item1, item2 }) => [getHelpTopicResolve({
        helpTopic: new HelpTopic({
          id: helpTopicId,
          detail: item2,
          title: item1
        })
      })]),
      catchError(() => of(getHelpTopicError()))
    ))
  ));

  getSettingByIdStart = createEffect(() => this.actions$.pipe(
    ofType(getLookupSettingByIdStart),
    switchMap(({ id }) => this._lookupsService.getGlobalSettingValue(id).pipe(
      switchMap((setting) => [getLookupSettingByIdResolve({ setting: { [id]: setting } })]),
      catchError(() => of(getLookupSettingByIdError))
    ))
  ));
}
