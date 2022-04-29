import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SystemSettingsFacade } from '@core/store/features/system-settings/system-settings.facade';

import { throwError, Observable, combineLatest, of, forkJoin } from 'rxjs';
import { catchError, finalize, map, switchMap, take } from 'rxjs/operators';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { MemberSearchFilter } from 'src/app/shared/constants/member.constants';

import { SystemSetting } from '@core/store/features/system-settings/system-settings.models';
import { GroupMemberListResolvereModel } from '../../models/group-member-list-resolver.model';

const initialSettings = {
  groupPicture: {
    settingId: 48,
    setting: {} as SystemSetting,
  },
};

@Injectable({ providedIn: 'root' })
export class GroupMemberListContainerResolver
  implements Resolve<Observable<GroupMemberListResolvereModel>> {
  constructor(
    private _toastService: ToastService,
    private _groupService: GroupService,
    private _loaderService: LoaderService,
    private _systemSettingsFacade: SystemSettingsFacade
  ) {}

  private includePhotos: boolean;
  settingPhoto(responds: any) {
    if (typeof responds === 'string') {
      if (responds.toLocaleLowerCase() === 'true') {
        this.includePhotos = true;
      } else {
        this.includePhotos = false;
      }
    } else {
      this.includePhotos = responds;
    }
  }
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<GroupMemberListResolvereModel> {
    const groupId = route.params['id'];
    this._loaderService.showLoader();
    const group$ = this._groupService.getGroupWithStats(groupId);
    const groupSearch$ = this._groupService.searchGroupContacts(
      groupId,
      MemberSearchFilter,
      this.includePhotos
    );

    this._systemSettingsFacade.settings$
      .pipe(
        switchMap(() =>
          forkJoin(
            Object.keys(initialSettings).map((s) =>
              this._systemSettingsFacade.findSystemSettingBySettingId(
                initialSettings[s].settingId
              )
            )
          ).pipe(
            take(1),
            map((res) => {
              return Object.keys(initialSettings).reduce((a, b) => {
                a[b] = {
                  ...initialSettings[b],
                  setting: res.find(
                    (s) => s?.settingID === initialSettings[b].settingId
                  ),
                };
                return a;
              }, initialSettings).groupPicture.setting.settingValue;
            })
          )
        )
      )
      .subscribe((photo) => this.settingPhoto(photo));

    return combineLatest([group$, groupSearch$]).pipe(
      take(1),
      finalize(() => {
        if (this._loaderService.hasLoaderAttached) {
          this._loaderService.removeLoader();
        }
      }),
      switchMap(([groupWithStats, groupMembersDisplay]) =>
        of({ groupWithStats, groupMembersDisplay })
      ),
      catchError((response) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to fetch group member details'
        );
        return throwError(response);
      })
    );
  }
}
