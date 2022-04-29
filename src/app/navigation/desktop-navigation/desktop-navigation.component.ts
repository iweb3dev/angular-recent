import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MENU_ITEMS_TOP, MENU_ITEMS_MIDDLE, MENU_ITEMS_BOTTOM, MENU_ITEMS_INFO, MENU_ITEMS_HELP } from '../navigation.constants';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/app/core/user-session/user-session.service';
import { MenuModel } from '../navigation.models';
import { Observable, Subscription } from 'rxjs';
import { RouteNames } from '@shared/models/enums/route-names';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { selectCurrentRoute } from 'src/app/store/router/router.selectors';
import { map } from 'rxjs/operators';
import { MessageNameService } from '@components/message-name/message-name.service';

@Component({
  selector: 'app-desktop-navigation',
  templateUrl: './desktop-navigation.component.html',
  styleUrls: ['./desktop-navigation.component.scss'],
})
export class DesktopNavigationComponent implements OnInit {
  public MENU_ITEMS_TOP = MENU_ITEMS_TOP;
  readonly MENU_ITEMS_HELP = MENU_ITEMS_HELP;
  public MENU_ITEMS_MIDDLE: MenuModel[] = [];
  public MENU_ITEMS_BOTTOM: MenuModel[] = [];
  public MENU_ITEMS_INFO: MenuModel[] = [];
  showingOnHover = false;
  sidenavCollapsed = true;
  currentRouteName$: Observable<RouteNames>;
  recipientGroups$: Observable<{ value: string; id: number }[]>;

  @Output()
  menuItemClicked = new EventEmitter<MenuModel>();

  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _userSessionService: UserSessionService,
    private _messageNameService: MessageNameService
  ) {
    this.currentRouteName$ = this._store.select(selectCurrentRoute).pipe(map(({ data }) => data.routeName));
  }

  ngOnInit(): void {
    if (!this._userSessionService.isManager) {
      this.MENU_ITEMS_MIDDLE = MENU_ITEMS_MIDDLE;
      this.MENU_ITEMS_BOTTOM = MENU_ITEMS_BOTTOM;
      this.MENU_ITEMS_INFO = MENU_ITEMS_INFO;
    }

    this.recipientGroups$ = this._messageNameService.fetchMessageRecipients();
  }

  @Input()
  set sideNavToggle(value: boolean) {
    this.sidenavCollapsed = value;
  }

  onSidenavMouseEnter(): void {
    if (this.sidenavCollapsed) {
      return;
    }
    this.showingOnHover = true;
  }

  onSidenavMouseLeave(): void {
    if (this.sidenavCollapsed) {
      return;
    }
    this.showingOnHover = false;
  }

  logoClicked() {
    this._router.navigate(['/dashboard']);
  }

  helpCenterItemClicked() {
    window.open('http://help.callingpost.com', '_blank');
  }

  privacyPolicy() {
    window.open('http://www.callingpost.com/privacypolicy.html', '_blank');
  }

  termsOfService() {
    window.open('http://www.callingpost.com/TermsAndConditions.pdf', '_blank');
  }

  feedBack() {
    window.open('https://www.callingpost.com/product-satisfaction.html', '_blank');
  }
}
