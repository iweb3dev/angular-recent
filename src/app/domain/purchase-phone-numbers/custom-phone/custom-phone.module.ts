import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PaymentModule } from 'src/app/components/payment/payment.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';

import { CustomPhoneDialogComponent } from './dialog/custom-phone-dialog.component';
import { CustomPhoneSheetComponent } from './sheet/custom-phone-sheet.component';
import { PurchasePhoneModule } from './purchase-phone/purchase-phone.module';
import { CustomPhoneService } from './custom-phone.service';

@NgModule({
  declarations: [CustomPhoneDialogComponent, CustomPhoneSheetComponent],
  imports: [
    CommonModule,
    LoaderModule,
    MatListModule,
    MatIconModule,
    PaymentModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PurchasePhoneModule,
    MatProgressSpinnerModule,
  ],
  providers: [CustomPhoneService],
  exports: [CustomPhoneDialogComponent, CustomPhoneSheetComponent],
})
export class CustomPhoneModule {}
