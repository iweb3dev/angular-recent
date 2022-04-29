import { createReducer, on } from '@ngrx/store';
import { getAllOrganizationLookupsResolve, getAllTimeZoneLookupsResolve, getHelpTopicResolve, getLookupSettingByIdResolve } from './lookups.actions';
import { LookupsState } from './lookups.models';


export const lookupsSlice = 'lookups';


const initialUserState: LookupsState = {
  organizationTypes: [],
  timeZones: [],
  helpTopics: [],
  globalLookupSettings: {}
};

export const reducer = createReducer(
  initialUserState,
  on(getAllOrganizationLookupsResolve, (state, { organizationTypes }) => ({
    ...state,
    organizationTypes: organizationTypes
  })),
  on(getAllTimeZoneLookupsResolve, (state, { timeZones }) => ({
    ...state,
    timeZones: timeZones
  })),
  on(getHelpTopicResolve, (state, { helpTopic }) => ({
    ...state,
    helpTopics: state.helpTopics.concat(helpTopic)
  })),
  on(getLookupSettingByIdResolve, (state, { setting }) => ({
    ...state,
    globalLookupSettings: {
      ...state.globalLookupSettings,
      ...setting
    }
  }))
);
