import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const LOOKUPS_API_BASE = `/api/lookups`;

export const GET_ADDITIONAL_CREDITS = `${ALLOW_ANONYMOUS}${LOOKUPS_API_BASE}/additionalcredits`;
export const GET_ORGANIZATION_LOOKUPS = `${ALLOW_ANONYMOUS}${LOOKUPS_API_BASE}/organizations`;
export const GET_GLOBAL_SETTINGS_LISTKVP = `${ALLOW_ANONYMOUS}${LOOKUPS_API_BASE}/settings/`;

export const GET_TIMEZONES_LOOKUPS = `${LOOKUPS_API_BASE}/timezones`;
export const GET_PREPAYMENTS = `${LOOKUPS_API_BASE}/prePayments`;
export const GET_FILTER_FIELDS = `${LOOKUPS_API_BASE}/filterfields`;
export const GET_GLOBAL_SETTING_VALUE_BYID = (settingsId: string) => `${LOOKUPS_API_BASE}/setting/${settingsId}`;
export const GET_IMPORT_MAPPING_FIELDS_BY_GROUPID = (groupId: number) => `${LOOKUPS_API_BASE}/importmappingfields/${groupId}`;
export const GET_HELP_TOPIC_BYID = (helpTopicId: string) => `${LOOKUPS_API_BASE}/helpTopic/${helpTopicId}`;
