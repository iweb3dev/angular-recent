import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';

import { UpdatePaymentSheetComponent } from './sheet/update-payment-sheet.component';
import { UpdatePaymentDialogComponent } from './dialog/update-payment-dialog.component';
import { PaymentModule } from 'src/app/components/payment/payment.module';

@NgModule({
  declarations: [UpdatePaymentSheetComponent, UpdatePaymentDialogComponent],
  imports: [
    CommonModule,
    PaymentModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    BottomSheetModule,
    ReactiveFormsModule,
  ],
})
export class UpdatePaymentModule {}
