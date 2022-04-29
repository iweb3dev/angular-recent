import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDividerModule } from '@angular/material/divider';

import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';

import { MoreActionsComponent } from './more-actions.component';

@NgModule({
  declarations: [MoreActionsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    OverlayModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    ConfirmDialogModule,
  ],
  exports: [MoreActionsComponent],
})
export class MoreActionsModule {}
