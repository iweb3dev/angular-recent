import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

import { PurchasePhoneNumbersModule } from 'src/app/domain/purchase-phone-numbers/purchase-phone-numbers.module';

import { TextMessageComponent } from './text-message.component';

@NgModule({
  declarations: [TextMessageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    PurchasePhoneNumbersModule,
  ],
  exports: [TextMessageComponent],
})
export class TextMessageModule {}
