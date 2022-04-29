import { Component, OnDestroy } from '@angular/core';
import { forkJoin, Subject, timer } from 'rxjs';
import { finalize, map, switchMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { SystemSettingsFacade } from 'src/app/core/store/features/system-settings/system-settings.facade';
import { SystemSetting } from 'src/app/core/store/features/system-settings/system-settings.models';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { VerifyPhoneDialogService } from 'src/app/shared/components/verify-phone/services/verify-phone-dialog.service';

const initialSettings = {
  validatedPhone: {
    settingName: 'Validated Phone Numbers - Currently used for Caller-Id or Live Answer Transfer',
    setting: {} as SystemSetting
  },
  customPhone: {
    settingName: 'The default selected custom phone number for Text messages.',
    setting: {} as SystemSetting
  },
  timeZone: {
    settingName: 'Send phone messages based on member time zone',
    setting: {} as SystemSetting
  }
};

@Component({
  selector: 'app-communication-settings',
  templateUrl: './communication-settings.component.html',
  styleUrls: ['./communication-settings.component.scss']
})
export class CommunicationSettingsComponent implements OnDestroy {
  progressBarVisable = false;
  progressValue = 0;
  json = JSON;
  defaultPhoneOption = '4053084474';
  defaultSelectedPhoneOption = '24251';
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

  allPhoneNumbers$ = this._userPhoneFacade.allUserPhones$;
  allCallerIds$ = this._userFacade.callerIds$;
  allBoughtPhoneNumbers$ = this._userFacade.boughtPhoneNumbers$;

  constructor(private _systemSettingsFacade: SystemSettingsFacade,
    private _userFacade: UserFacade,
    private _userPhoneFacade: UserPhoneFacade,
    private _verifyPhoneDialogService: VerifyPhoneDialogService) {}


  onUpdateSetting(setting: SystemSetting, value: any) {
    this._systemSettingsFacade.updateSystemSetting({
      ...setting,
      settingValue: value
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

  onAddPhoneNumber() {
    this._verifyPhoneDialogService.showVerifyPhoneDialog();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
