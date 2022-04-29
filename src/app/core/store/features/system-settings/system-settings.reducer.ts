import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { getSystemSettingsResolve, updateSystemSettingsResolve } from './system-settings.actions';
import { SystemSetting } from './system-settings.models';


export interface SystemSettingsState extends EntityState<SystemSetting> {}

export const systemSettingsSlice = 'systemSettings';
const systemSettingsAdapter = createEntityAdapter<SystemSetting>(
  { selectId: s => s.settingID }
);

const initialState = systemSettingsAdapter.getInitialState();
export const reducer = createReducer(
  initialState,
  on(getSystemSettingsResolve, (state, { settings }) => systemSettingsAdapter.setAll(settings, state)),
  on(updateSystemSettingsResolve, (state, { setting }) => systemSettingsAdapter.updateOne({
    id: setting.settingID,
    changes: setting
  }, state))
);
