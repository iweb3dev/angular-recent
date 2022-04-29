import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersRoutingModule } from './reminders.routes';
import { RemindersComponent } from './reminders.component';

@NgModule({
  declarations: [RemindersComponent],
  imports: [
    CommonModule,
    RemindersRoutingModule
  ]
})
export class RemindersModule {}
