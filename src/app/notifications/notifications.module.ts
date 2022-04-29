import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications.routes';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ],
})
export class NotificationsModule {}
