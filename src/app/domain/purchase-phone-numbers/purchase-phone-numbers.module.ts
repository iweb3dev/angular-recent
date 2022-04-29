import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasePhoneNumbersDirective } from './purchase-phone-numbers.directive';
import { PurchasePhoneNumbersService } from './purchase-phone-numbers.service';
import { CustomPhoneModule } from './custom-phone/custom-phone.module';

@NgModule({
  declarations: [PurchasePhoneNumbersDirective],
  imports: [CommonModule, CustomPhoneModule ],
  providers: [PurchasePhoneNumbersService],
  exports: [PurchasePhoneNumbersDirective],
})
export class PurchasePhoneNumbersModule {}
