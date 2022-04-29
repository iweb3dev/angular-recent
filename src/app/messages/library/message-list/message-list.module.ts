import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageListComponent } from './message-list.component';
import { MessageListDesktopModule } from './message-list-desktop/message-list-desktop.module';
import { MessageListMobileModule } from './message-list-mobile/message-list-mobile.module';

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule, MessageListDesktopModule, MessageListMobileModule],
  exports: [MessageListComponent],
})
export class MessageListModule {}
