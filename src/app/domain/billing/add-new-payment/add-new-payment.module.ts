import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddNewPaymentDirective } from './add-new-payment.directive';
import { AddPaymentModule } from './add-payment/add-payment.module';

@NgModule({
  declarations: [AddNewPaymentDirective],
  imports: [CommonModule, AddPaymentModule],
  exports: [AddNewPaymentDirective],
})
export class AddNewPaymentModule {}
