import { Component } from '@angular/core';
import { take, tap } from 'rxjs/operators';

import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

@Component({
  selector: 'app-call-in-settings-detail',
  templateUrl: './call-in-settings-detail.component.html',
  styleUrls: ['./call-in-settings-detail.component.scss'],
})
export class CallInSettingsDetailComponent {

  user$ = this._userFacade.currentUserInfo$;
  steps = [
    'View or set up your User Id number below.',
    'Call 1-877-304-7678 from anywhere and any device. no internet connection required.',
    'Work with groups and send messages straight from your phone.',
  ];
  formValue = '';
  callInNumber = this._lookupsFacade.getGlobalLookupSettingById('49').pipe(
    tap((val) => {
      this.steps[1] = `Call ${val} from anywhere and any device. no internet connection required.`;
    }),
  );

  constructor(
    private _userFacade: UserFacade,
    private _lookupsFacade: LookupsFacade,
  ) {}

  onSave(event?) {
    this.user$.pipe(take(1)).subscribe((user) =>
      this._userFacade.saveCallInSettings({
        ...user,
        telUserName: this.formValue,
      }),
    );
  }
}
