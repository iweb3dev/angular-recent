import { UserSessionService } from 'src/app/core/user-session/user-session.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { LoginModalComponent } from '../auth/login/login-modal/login-modal.component';
import { LoginModel } from '../auth/login/login.models';
import { logIn, logInSuccess } from '../auth/login/store/login.actions';
import { MainUserInfoModel } from '../core/store/features/user/user.model';
import { selectMainUserInfo } from '../core/store/features/user/user.selectors';
import { AppState } from '../store/app-state';
import { selectCurrentRoute } from '../store/router/router.selectors';
import { MENU_ITEMS_SWITCH, USER_MENU_ITEMS } from './navigation.constants';
import { MenuModel } from './navigation.models';
import { RouteNames } from '../shared/models/enums/route-names';
import { NewMessageFacade } from '../core/store/features/new-message/new-message.facade';
import { UserNotification } from '../api/notifications/notifications.models';
import { NotificationsFacade } from '../core/store/features/notifications/notifications.facade';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit, OnDestroy {
  public USER_MENU_ITEMS: MenuModel[] = [];
  readonly switchAccount = RouteNames.SwitchAccount;
  readonly MENU_ITEMS_SWITCH = MENU_ITEMS_SWITCH;
  userInfo$: Observable<MainUserInfoModel>;
  currentRouteName$: Observable<RouteNames>;
  public allNotifications$ = this._notificationsFacade.latestNotifications$;
  public notificationCount = undefined;
  public userNotificationOpen = false;
  public userNotifications: UserNotification[] = [];
  menuCollapsed = true;
  mobileNavOpened = false;
  userOverlayOpen = false;
  destroyed$ = new Subject<boolean>();
  public showNavigateBefore = true;

  private _credentials: LoginModel;
  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _location: Location,
    public dialog: MatDialog,
    private _userSessionService: UserSessionService,
    private _newMessageFacade: NewMessageFacade,
    private _actions$: Actions,
    private _notificationsFacade: NotificationsFacade
  ) {
    if (_userSessionService.isManager) {
      const logoutMenuItem = USER_MENU_ITEMS.filter(
        (menuItems: MenuModel) => menuItems.title === RouteNames.Logout || menuItems.title === RouteNames.SwitchAccount
      );
      this.USER_MENU_ITEMS.push(...logoutMenuItem);
    } else {
      this._store
        .select(selectMainUserInfo)
        .pipe(
          filter((data) => !!data),
          tap((mainUserInfo) => {
            if (mainUserInfo.package.costType === 'SUBSCRIBER') {
              this.USER_MENU_ITEMS = USER_MENU_ITEMS;
            } else {
              this.USER_MENU_ITEMS = USER_MENU_ITEMS.filter((menuItems: MenuModel) => menuItems.title !== RouteNames.GroupManagers);
            }
          })
        )
        .subscribe();
    }
    this.currentRouteName$ = this._store.select(selectCurrentRoute).pipe(map(({ data }) => {
      return data.routeName;
    }));

    this.userInfo$ = this._store.select(selectMainUserInfo).pipe(filter((data) => !!data));
  }

  ngOnInit(): void {
    if (this._router.navigated) {
      if (this._router.getCurrentNavigation.name === '/dashboard') {
        this.showNavigateBefore = false;
      } else {
        this.showNavigateBefore = true;
      }
    }
    // Group Managers
    this._notificationsFacade.getAllNotifications();
    this.allNotifications$.pipe(takeUntil(this.destroyed$)).subscribe((notifications) => {
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
  }

  toggleSideNavigation(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  get isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  onSwichAccountDialog(userinfo: MainUserInfoModel) {
    const accounts = userinfo.accountsManaged;

    this._credentials = {
      login: userinfo.username,
      password: userinfo.password,
      ownerID: null,
    };

    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
      data: { id: 1, accounts },
      panelClass: 'login-modal',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result || result === 0) {
        this._userSessionService.terminateSession();
        this.watchLogInSuccess();
        if (result !== 0) {
          this._credentials.ownerID = result;
          this._store.dispatch(logIn(this._credentials));
        } else {
          this._credentials.ownerID = 0;
          this._store.dispatch(logIn(this._credentials));
        }
      }
    });
  }

  watchLogInSuccess() {
    this._actions$.pipe(ofType(logInSuccess), takeUntil(this.destroyed$)).subscribe((res) => {
      this.onAccountChanged();
    });
  }

  logoClicked() {
    this._router.navigate(['/dashboard']);
  }

  onAccountChanged() {
    this._router.navigateByUrl('/dashboard');
    window.location.reload();
  }

  onMenuItemClick(menuItem: MenuModel): void {
    if (menuItem.title === RouteNames.SendMessage) {
      this._newMessageFacade.resetMessageState();
    }
  }

  public closeOnClick(): void {
    if (this._router.url === '/dashboard') {
      this.showNavigateBefore = false;
    } else {
      this.showNavigateBefore = true;
      this._location.back();
      if (this._router.url === '/dashboard') {
        this.showNavigateBefore = false;
      }
    }
  }

  privacyPolicy() {
    window.open('http://www.callingpost.com/privacypolicy.html', '_blank');
  }

  termsOfService() {
    window.open('http://www.callingpost.com/TermsAndConditions.pdf', '_blank');
  }

  public openNotifications() {
    this._router.navigateByUrl('/notifications');
  }

  feedBack() {
    window.open('https://www.callingpost.com/product-satisfaction.html', '_blank');
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
