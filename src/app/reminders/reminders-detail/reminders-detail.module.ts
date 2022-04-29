import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemindersDetailComponent } from './reminders-detail.component';
import { NoRemindersComponent } from './components/no-reminders/no-reminders.component';
import { HasRemindersComponent } from './components/has-reminders/has-reminders.component';
import { StepListModule } from 'src/app/shared/components/step-list/step-list.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommunicationSortPipe } from './pipes/sort-reminders.pipe';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RemindersDetailComponent,
    NoRemindersComponent,
    HasRemindersComponent,
    CommunicationSortPipe
  ],
  imports: [
    CommonModule,
    StepListModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ConfirmDialogModule,
    PipesModule
  ]
})
export class RemindersDetailModule {}
