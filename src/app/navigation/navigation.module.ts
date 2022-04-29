import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavigationComponent } from './navigation.component';

import { PipesModule } from '../shared/pipes/pipes.module';
import { MenuItemModule } from './shared/components/menu-item/menu-item.module';
import { MobileNavigationModule } from './mobile-navigation/mobile-navigation.module';
import { CurrentYearModule } from '@shared/components/current-year/current-year.module';
import { DesktopNavigationModule } from './desktop-navigation/desktop-navigation.module';
import { NavUserInfoModule } from './shared/components/nav-user-info/nav-user-info.module';
import { CurrentRouteModule } from './shared/components/current-route/current-route.module';
import { MenuItemHelpModule } from './shared/components/menu-item-help/menu-item-help.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    PipesModule,
    MatCardModule,
    OverlayModule,
    MatIconModule,
    MenuItemModule,
    MatBadgeModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    CurrentYearModule,
    NavUserInfoModule,
    CurrentRouteModule,
    MenuItemHelpModule,
    MobileNavigationModule,
    DesktopNavigationModule,
  ],
  exports: [NavigationComponent],
})
export class NavigationModule {}
