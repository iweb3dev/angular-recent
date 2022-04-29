import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Subject, timer } from 'rxjs';
import { finalize, map, switchMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { SystemSettingsFacade } from 'src/app/core/store/features/system-settings/system-settings.facade';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';
import { selectMainUserInfo } from 'src/app/core/store/features/user/user.selectors';
import { AppState } from 'src/app/store/app-state';

const initialSettings = {
  allowPrimaryPayment: {
    settingName: 'Allow Primary Payment Method to be charged as needed for additional credits',
    setting: {} as SystemSetting
  },
  communicationEmail: {
    settingName: 'Send Email When A Communication Finishes',
    setting: {} as SystemSetting
  },
  twoWayText: {
    settingName: 'Notify me of two-way text message responses',
    setting: {} as SystemSetting
  },
  sharedControl: {
    settingName: 'Display Shared Control prompt',
    setting: {} as SystemSetting
  },
  calenderView: {
    settingName: 'Set Calendar View as Default for Events',
    setting: {} as SystemSetting
  },
};

@Component({
  selector: 'app-extra-settings',
  templateUrl: './extra-settings.component.html',
  styleUrls: ['./extra-settings.component.scss']
})
export class ExtraSettingsComponent implements OnDestroy {
  progressBarVisable = false;
  progressValue = 0;
  json = JSON;
  planType: string;
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

  constructor(private _systemSettingsFacade: SystemSettingsFacade, private _store: Store<AppState>) {
    this._store.select(selectMainUserInfo)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!user) {
          return;
        }
        this.planType = user.package ? user.package.costType.toLowerCase() : '';
      });
  }

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
