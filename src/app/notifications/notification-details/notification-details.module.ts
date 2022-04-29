import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationDetailsComponent } from './notification-details.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule
  ],
  exports: [],
  declarations: [NotificationDetailsComponent],
  providers: [],
})
export class NotificationDetailsModule {}
