import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MenuItemHelpModule } from '../shared/components/menu-item-help/menu-item-help.module';
import { MenuItemModule } from '../shared/components/menu-item/menu-item.module';

import { MobileNavigationComponent } from './mobile-navigation.component';
import { NavUserInfoModule } from '../shared/components/nav-user-info/nav-user-info.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CurrentYearModule } from '@shared/components/current-year/current-year.module';

@NgModule({
  declarations: [MobileNavigationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MenuItemModule,
    MenuItemHelpModule,
    CurrentYearModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    NavUserInfoModule,
    MatExpansionModule,
  ],
  exports: [MobileNavigationComponent],
})
export class MobileNavigationModule {}
