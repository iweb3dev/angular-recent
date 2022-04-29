import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { MessageActionsComponent } from './message-actions.component';
import { MessageActionsService } from './message-actions.service';

@NgModule({
  declarations: [MessageActionsComponent],
  imports: [CommonModule, FlexLayoutModule, MatButtonModule],
  exports: [MessageActionsComponent],
  providers: [MessageActionsService],
})
export class MessageActionsModule {}
