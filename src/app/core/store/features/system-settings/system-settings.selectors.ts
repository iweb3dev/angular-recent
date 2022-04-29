import { createSelector } from '@ngrx/store';

import { AppState } from 'src/app/store/app-state';

export const selectSysytemSettingsState = (state: AppState) => {
  return state.coreStore.systemSettings;
};
export const getSystemSettings = createSelector(
  selectSysytemSettingsState,
  (state) => Object.values(state.entities)
);
export const findSystemSettingByDisplayName = createSelector(
  getSystemSettings,
  (settings) => (displayName: string) => settings.find(s => s.description.toLowerCase() === displayName.toLowerCase())
);
export const findSystemSettingBySettingId = createSelector(
  getSystemSettings,
  (settings) => (settingId: number) => settings.find(s => s.settingID === settingId)
);
