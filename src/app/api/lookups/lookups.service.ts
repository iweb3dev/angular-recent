import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http } from '../../core/http/http.service';
import { TimeZone } from '../shared/shared.models';
import {
  GET_ORGANIZATION_LOOKUPS, GET_TIMEZONES_LOOKUPS, GET_ADDITIONAL_CREDITS,
  GET_PREPAYMENTS, GET_FILTER_FIELDS, GET_GLOBAL_SETTINGS_LISTKVP,
  GET_GLOBAL_SETTING_VALUE_BYID,
  GET_IMPORT_MAPPING_FIELDS_BY_GROUPID, GET_HELP_TOPIC_BYID
} from './lookups.api';

import {
  AdditionalCredit, PrePayOption, FilterField, Organizations,
  GlobalSettingsKvpById, ImportMappingFields,
  HelpTopic
} from './lookups.models';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {

  constructor(private _http: Http, private _httpClient: HttpClient, ) {}

  getAdditionalCredits(): Observable<AdditionalCredit[]> {
    return this._httpClient.get<AdditionalCredit[]>(GET_ADDITIONAL_CREDITS);
  }

  getAllOrganizationTypes(): Observable<Organizations[]> {
    return this._httpClient.get<Organizations[]>(GET_ORGANIZATION_LOOKUPS);
  }

  getGlobalSettingsList(): Observable<GlobalSettingsKvpById[]> {
    return this._httpClient.get<GlobalSettingsKvpById[]>(GET_GLOBAL_SETTINGS_LISTKVP);
  }

  getAllTimeZones(): Observable<TimeZone[]> {
    return this._http.get<TimeZone[]>(GET_TIMEZONES_LOOKUPS);
  }

  getPrePayments(): Observable<PrePayOption[]> {
    return this._http.get<PrePayOption[]>(GET_PREPAYMENTS);
  }

  getFilterFields(): Observable<FilterField[]> {
    return this._http.get<FilterField[]>(GET_FILTER_FIELDS);
  }

  getGlobalSettingValue(settingsId: string): Observable<string> {
    return this._http.get<string>(GET_GLOBAL_SETTING_VALUE_BYID(settingsId));
  }

  getImportMappingFields(groupId: number): Observable<ImportMappingFields[]> {
    return this._http.get<ImportMappingFields[]>(GET_IMPORT_MAPPING_FIELDS_BY_GROUPID(groupId));
  }

  getHelpTopic(helpTopicId: string): Observable<HelpTopic> {
    return this._http.get<HelpTopic>(GET_HELP_TOPIC_BYID(helpTopicId));
  }

}
