import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MenuItemComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [MenuItemComponent],
})
export class MenuItemModule {}
