import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '../../core.store';

const getFeaturSlice = createFeatureSelector<fromCore.CoreState>(fromCore.featureStore);

export const getLookupsState = createSelector(
  getFeaturSlice,
  (state) => state.lookups
);

export const getOrganizationTypesLookups = createSelector(
  getLookupsState,
  (state) => state.organizationTypes
);

export const getAllTimeZoneLookups = createSelector(
  getLookupsState,
  (state) => state.timeZones
);

export const getHelpTopicById = createSelector(
  getLookupsState,
  (state) => (id: string) => state.helpTopics.find(s => s.id === id)
);

export const getAllHelpTopics = createSelector(
  getLookupsState,
  (state) => state.helpTopics
);

export const getGlobalLookupSettingById = createSelector(
  getLookupsState,
  (state) => (id: string) => state.globalLookupSettings[id]
);

export const getAllGlobalLookupSettings = createSelector(
  getLookupsState,
  (state) => state.globalLookupSettings
);
