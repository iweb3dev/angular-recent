import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { PaymentModule } from 'src/app/components/payment/payment.module';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';

import { AddPaymentSheetComponent } from './sheet/add-payment-sheet.component';
import { AddPaymentDialogComponent } from './dialog/add-payment-dialog.component';

@NgModule({
  declarations: [AddPaymentSheetComponent, AddPaymentDialogComponent],
  imports: [
    CommonModule,
    PaymentModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    BottomSheetModule,
    ReactiveFormsModule,
  ],
  exports: [AddPaymentSheetComponent, AddPaymentDialogComponent],
})
export class AddPaymentModule {}
