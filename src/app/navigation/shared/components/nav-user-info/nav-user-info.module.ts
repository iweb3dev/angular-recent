import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatBadgeModule } from '@angular/material/badge';

import { NavUserInfoComponent } from './nav-user-info.component';
import { MenuItemModule } from '../menu-item/menu-item.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [NavUserInfoComponent],
  imports: [
    CommonModule,
    PipesModule,
    OverlayModule,
    MatIconModule,
    MenuItemModule,
    MatButtonModule,
    MatBadgeModule,
    FlexLayoutModule,
  ],
  exports: [NavUserInfoComponent],
})
export class NavUserInfoModule {}
