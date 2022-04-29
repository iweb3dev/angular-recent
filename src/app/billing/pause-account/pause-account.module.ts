import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { PauseAccountComponent } from './pause-account.component';
import { PauseAccountRoutingModule } from './pause-account.routes';
import { PauseAccountService } from './pause-account.service';
import { ReactivateScheduleModule } from './reactivate-schedule/reactivate-schedule.module';

@NgModule({
  declarations: [PauseAccountComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    ReactivateScheduleModule,
    PauseAccountRoutingModule,
  ],
  providers: [PauseAccountService],
})
export class PauseAccountModule {}
