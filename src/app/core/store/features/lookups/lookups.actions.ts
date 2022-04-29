import { createAction, props } from '@ngrx/store';
import { HelpTopic, OrganizationType, TimeZone } from './lookups.models';

export const getAllOrganizationLookupsStart = createAction('[Lookups] Get All Organization Lookups Start');
export const getAllOrganizationLookupsResolve = createAction('[Lookups] Get All Organization Lookups Resolve',
 props<{ organizationTypes: OrganizationType[] }>());

export const getAllTimeZoneLookupsStart = createAction('[Lookups] Get All TimeZone Lookups Start');
export const getAllTimeZoneLookupsResolve = createAction('[Lookups] Get All TimeZone Lookups Resolve',
 props<{ timeZones: TimeZone[] }>());

export const getHelpTopicStart = createAction('[Lookups] Get Help Topic Start', props<{ helpTopicId: string }>());
export const getHelpTopicResolve = createAction('[Lookups] Get Help Topic Resolve', props<{ helpTopic: HelpTopic }>());
export const getHelpTopicError = createAction('[Lookups] Get Help Topic Error');

export const getLookupSettingByIdStart = createAction('[Lookups] Get Setting By Id Start', props<{ id: string }>());
export const getLookupSettingByIdResolve = createAction('[Lookups] Get Setting By Id Resolve',
props<{ setting: { [id: string]: string } }>());
export const getLookupSettingByIdError = createAction('[Lookups] Get Setting By Id Error');
