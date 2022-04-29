import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from '@shared/models/enums/route-names';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserNotification } from 'src/app/api/notifications/notifications.models';

import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { NotificationsFacade } from 'src/app/core/store/features/notifications/notifications.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PackageLabels } from 'src/app/shared/constants/financials.constants';

@Component({
  selector: 'app-nav-user-info',
  templateUrl: './nav-user-info.component.html',
  styleUrls: ['./nav-user-info.component.scss'],
})
export class NavUserInfoComponent implements OnInit {
  readonly PackageTypeIds = PackageTypeIds;
  userMenuOpen = false;
  public profilePicture: string;
  public readonly defaultPicture = '/assets/img/avatar-placeholder.svg';
  public allNotifications$ = this._notificationsFacade.latestNotifications$;
  public notificationCount = undefined;
  public userNotificationOpen = false;
  public userNotifications: UserNotification[] = [];

  private destroy$ = new Subject<any>();

  @Input()
  set routeChanged(value: RouteNames) {
    this.userMenuOpen = false;
  }

  public userInfo: MainUserInfoModel;

  get packageName(): string {
    if (!this.userInfo) {
      return '';
    }

    return PackageLabels[this.userInfo.package.packageTypeId];
  }

  get userPackageInfo(): string {
    const packageDetails = `${this.userInfo.userMemberPhoneCount}/${this.userInfo.package.memberCount}`;

    return this.packageName
      ? `${this.packageName} - ${packageDetails}`
      : packageDetails;
  }

  constructor(
    private _userFacade: UserFacade,
    private _router: Router,
    private _notificationsFacade: NotificationsFacade,
  ) {}

  ngOnInit(): void {
    this._notificationsFacade.getAllNotifications();
    this.allNotifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((notifications) => {
        if (notifications) {
          this.userNotifications = notifications;
          this.notificationCount = 0;
          notifications.forEach((notification) => {
            if (!notification.viewed) {
              this.notificationCount++;
            }
          });
        }
        if (this.notificationCount === 0) {
          this.notificationCount = undefined;
        }
      });
    this._userFacade.currentUserInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user === null || !user) {
          this.userInfo = user;
          return;
        }
        this.userInfo = user;
        this.setUserImage(this.userInfo);
      });
  }

  public openNotifications() {
    this._router.navigateByUrl('/notifications');
  }

  private setUserImage(user: MainUserInfoModel): void {
    if (!user?.userPicture?.imageContents) {
      return;
    }
    const type = user.userPicture.fileName.split('.')[1];
    this.profilePicture = `data:image\\${type};base64,${user.userPicture.imageContents}`;
  }

  public userDetailsOnClick() {
    this._router.navigate(['/billing/plan-details']);
  }

  public userBillingPlanDetails() {
    this._router.navigate(['/billing']);
  }

  public userBuyCredits() {
    this._router.navigate(['/billing/credits']);
  }

  public userProfile() {
    this._router.navigate(['/user']);
  }
}
