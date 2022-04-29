import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { PaymentModule } from 'src/app/components/payment/payment.module';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { PromoModule } from 'src/app/components/promo/promo.module';

import { PurchaseCreditsSheetComponent } from './sheet/purchase-credits-sheet.component';
import { PurchaseCreditsDialogComponent } from './dialog/purchase-credits-dialog.component';

@NgModule({
  declarations: [PurchaseCreditsSheetComponent, PurchaseCreditsDialogComponent],
  imports: [
    PromoModule,
    CommonModule,
    PaymentModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    BottomSheetModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
})
export class PurchaseCreditsModule {}
