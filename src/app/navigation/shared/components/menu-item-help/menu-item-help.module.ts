import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemHelpComponent } from './menu-item-help.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MenuItemHelpComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [MenuItemHelpComponent],
})
export class MenuItemHelpModule {}
