import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Subject, timer } from 'rxjs';
import { finalize, map, switchMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { SystemSettingsFacade } from 'src/app/core/store/features/system-settings/system-settings.facade';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';

const initialSettings = {
  loginInstruction: {
    settingName: 'Show User Page Instructions on login',
    setting: {} as SystemSetting
  },
  pbxWizard: {
    settingName: 'Skip the first page of PBX Wizard which details features',
    setting: {} as SystemSetting
  },
  loginVideo: {
    settingName: 'Show Getting Started video on login',
    setting: {} as SystemSetting
  },
  communicationOptions: {
    settingName: 'Show Send Communications Options',
    setting: {} as SystemSetting
  },
  importVideo: {
    settingName: 'Show How To Import video',
    setting: {} as SystemSetting
  },
  smsVideo: {
    settingName: 'Show How SMS/Text Works video',
    setting: {} as SystemSetting
  }
};

@Component({
  selector: 'app-help-prompt',
  templateUrl: './help-prompt.component.html',
  styleUrls: ['./help-prompt.component.scss']
})
export class HelpPromptComponent implements OnDestroy {
  progressBarVisable = false;
  progressValue = 0;
  json = JSON;
  private destroy$ = new Subject();
  settings$ = this._systemSettingsFacade.settings$.pipe(
    takeUntil(this.destroy$),
    switchMap(() => forkJoin(Object.keys(initialSettings)
    .map(s => this._systemSettingsFacade.findSystemSettingByDisplayName(initialSettings[s].settingName)))
    .pipe(
      take(1),
      map(res => {
        return Object.keys(initialSettings).reduce((a, b) => {
          a[b] = {
            ...initialSettings[b],
            setting: res.find(s => s?.description === initialSettings[b].settingName)
          };
          return a;
        }, initialSettings);
      }))));

  constructor(private _systemSettingsFacade: SystemSettingsFacade) {}


  onUpdateSetting(setting: SystemSetting, value: any) {
    this._systemSettingsFacade.updateSystemSetting({
      ...setting,
      settingValue: value.checked
    });
  }

  parseBool(setting: string) {
    setting = setting?.toString() || '';
    if (setting?.toString().toLowerCase() === 'true') {
      return true;
    } else {
      return false;
    }
  }

  showProgressBar() {
    this.progressBarVisable = true;
    timer(0, 1)
    .pipe(
      takeWhile(s => 150 > s),
      finalize(() => {
        this.progressBarVisable = false;
        this.progressValue = 0;
      })
    )
    .subscribe(s => {
      this.progressValue = s;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
