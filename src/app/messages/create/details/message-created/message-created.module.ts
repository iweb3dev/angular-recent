import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessageCreatedComponent } from './message-created.component';

@NgModule({
  declarations: [MessageCreatedComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, FlexLayoutModule],
  exports: [MessageCreatedComponent],
})
export class MessageCreatedModule {}
