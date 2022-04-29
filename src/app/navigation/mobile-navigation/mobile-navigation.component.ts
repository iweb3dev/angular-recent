import { USER_MENU_ITEMS_M } from './../navigation.constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RouteNames } from '@shared/models/enums/route-names';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { AppState } from 'src/app/store/app-state';
import { selectCurrentRoute } from 'src/app/store/router/router.selectors';

import {
  MENU_ITEMS_TOP,
  MENU_ITEMS_MIDDLE,
  MENU_ITEMS_BOTTOM,
  MENU_ITEMS_INFO,
  USER_MENU_ITEMS,
  MENU_ITEMS_HELP,
} from '../navigation.constants';

import { MenuModel } from '../navigation.models';

@Component({
  selector: 'app-mobile-navigation',
  templateUrl: './mobile-navigation.component.html',
  styleUrls: ['./mobile-navigation.component.scss'],
})
export class MobileNavigationComponent implements OnInit {
  readonly MENU_ITEMS_TOP = MENU_ITEMS_TOP;
  readonly MENU_ITEMS_MIDDLE = MENU_ITEMS_MIDDLE;
  readonly MENU_ITEMS_BOTTOM = MENU_ITEMS_BOTTOM;
  readonly MENU_ITEMS_INFO = MENU_ITEMS_INFO;
  readonly USER_MENU_ITEMS = USER_MENU_ITEMS;
  readonly USER_MENU_ITEMS_M = USER_MENU_ITEMS_M;
  readonly MENU_ITEMS_HELP = MENU_ITEMS_HELP;
  currentRouteName$: Observable<RouteNames>;

  @Input()
  opened = false;

  @Input()
  userInfo: MainUserInfoModel;

  @Output()
  openedChange = new EventEmitter<boolean>();

  @Output()
  menuItemClicked = new EventEmitter<MenuModel>();

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.currentRouteName$ = this._store.select(selectCurrentRoute).pipe(map(({ data }) => data.routeName));
  }

  ngOnInit(): void {}

  logoClicked() {
    this._router.navigate(['/dashboard']);
    this.opened = false;
  }

  helpCenterItemClicked() {
    window.open('http://help.callingpost.com', '_blank');
  }

  onMenuItemClick(menuItem: MenuModel): void {
    this.opened = false;
    this.menuItemClicked.emit(menuItem);
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
