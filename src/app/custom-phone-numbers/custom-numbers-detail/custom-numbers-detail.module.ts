import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { CustomNumbersDetailComponent } from './custom-numbers-detail.component';
import { CustomNumbersDetailContainerComponent } from './custom-numbers-detail.container';
import { HasPhoneNumbersModule } from './has-phone-numbers/has-phone-numbers.module';
import { NoPhoneNumbersModule } from './no-phone-numbers/no-phone-numbers.module';
import { CustomNumbersDetailsRoutingModule } from './custom-numbers-detail.routes';

@NgModule({
  declarations: [
    CustomNumbersDetailComponent,
    CustomNumbersDetailContainerComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    NoPhoneNumbersModule,
    HasPhoneNumbersModule,
    CustomNumbersDetailsRoutingModule,
  ],
})
export class CustomNumbersDetailModule {}
