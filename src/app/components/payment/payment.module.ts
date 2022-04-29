import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';

import { PaymentComponent } from './payment.component';
import { CreditCardModule } from './credit-card/credit-card.module';
import { BankAccountModule } from './bank-account/bank-account.module';

import { PaypalModule } from '../paypal/paypal.module';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaypalModule,
    MatTabsModule,
    FlexLayoutModule,
    CreditCardModule,
    BankAccountModule,
    MatExpansionModule,
  ],
  exports: [PaymentComponent],
})
export class PaymentModule {}
