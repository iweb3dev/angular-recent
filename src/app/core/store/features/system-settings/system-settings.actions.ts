import { createAction, props } from '@ngrx/store';
import { SystemSetting } from './system-settings.models';

export const getSystemSettingsStart = createAction(
  '[System Settings] Get start'
);
export const getSystemSettingsResolve = createAction(
  '[System Settings] Get Resolve', props<{ settings: SystemSetting[] }>()
);
export const getSystemSettingsError = createAction(
  '[System Settings] Get Error'
);

export const updateSystemSettingsStart = createAction(
  '[System Settings] Update start', props<{ setting: SystemSetting }>()
);
export const updateSystemSettingsResolve = createAction(
  '[System Settings] Update Resolve', props<{ setting: SystemSetting }>()
);
export const updateSystemSettingsError = createAction(
  '[System Settings] Update Error', props<{ setting: SystemSetting }>()
);
