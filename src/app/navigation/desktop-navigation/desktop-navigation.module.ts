import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MessageNameService } from '@components/message-name/message-name.service';
import { CurrentYearModule } from '@shared/components/current-year/current-year.module';
import { MenuItemHelpModule } from '../shared/components/menu-item-help/menu-item-help.module';
import { MenuItemModule } from '../shared/components/menu-item/menu-item.module';

import { DesktopNavigationComponent } from './desktop-navigation.component';


@NgModule({
  declarations: [DesktopNavigationComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MenuItemModule,
    MenuItemHelpModule,
    CurrentYearModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
  ],
  exports: [DesktopNavigationComponent],
  providers: [MessageNameService],
})
export class DesktopNavigationModule {}
