import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { CustomPhoneNumbersComponent } from './custom-phone-numbers.component';
import { CustomPhoneNumbersRoutingModule } from './custom-phone-numbers.routes';

@NgModule({
  declarations: [CustomPhoneNumbersComponent],
  imports: [
    CommonModule,
    CustomPhoneNumbersRoutingModule,
    MatBottomSheetModule,
  ],
  providers: [],
})
export class CustomPhoneNumbersModule {}
