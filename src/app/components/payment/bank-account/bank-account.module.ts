import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BankAccountComponent } from './bank-account.component';

@NgModule({
  declarations: [BankAccountComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [BankAccountComponent],
})
export class BankAccountModule {}
