import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';

import { AddNewPaymentModule } from 'src/app/domain/billing/add-new-payment/add-new-payment.module';

import { BillingInfoComponent } from './billing-info.component';
import { BillingInfoService } from './billing-info.service';
import { UpdatePaymentModule } from './update-payment/update-payment.module';

@NgModule({
  declarations: [BillingInfoComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    UpdatePaymentModule,
    AddNewPaymentModule,
    MatBottomSheetModule,
  ],
  exports: [BillingInfoComponent],
  providers: [BillingInfoService],
})
export class BillingInfoModule {}
