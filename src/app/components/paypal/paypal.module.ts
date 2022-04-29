import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPayPalModule } from 'ngx-paypal';

import { PaypalComponent } from './paypal.component';

@NgModule({
  declarations: [PaypalComponent],
  imports: [CommonModule, NgxPayPalModule],
  exports: [PaypalComponent],
})
export class PaypalModule {}
