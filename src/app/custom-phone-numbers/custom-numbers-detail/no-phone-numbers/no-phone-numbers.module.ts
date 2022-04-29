import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { PurchasePhoneNumbersModule } from 'src/app/domain/purchase-phone-numbers/purchase-phone-numbers.module';

import { NoPhoneNumbersComponent } from './no-phone-numbers.component';

@NgModule({
  declarations: [NoPhoneNumbersComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    PurchasePhoneNumbersModule,
  ],
  exports: [NoPhoneNumbersComponent],
})
export class NoPhoneNumbersModule {}
