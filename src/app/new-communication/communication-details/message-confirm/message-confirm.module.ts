import { NoGroupsDialogComponent } from './no-groups-dialog/no-groups-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MessageConfirmComponent } from './message-confirm.component';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import { ScheduleModule } from './schedule/schedule.module';
import { MonthlyLimitWarningComponent } from './monthly-limit-warning/monthly-limit-warning.component';
import { MemberLimitReachedComponent } from './member-limit-reached/member-limit-reached.component';
import { NoCreditDialogComponent } from './no-credit-dialog/no-credit-dialog.component';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    MessageConfirmComponent,
    CommunicationDetailsComponent,
    MonthlyLimitWarningComponent,
    MemberLimitReachedComponent,
    NoCreditDialogComponent,
    NoGroupsDialogComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ScheduleModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    PipesModule,
  ],
  exports: [MessageConfirmComponent],
})
export class MessageConfirmModule {}
