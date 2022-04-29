import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CreditCardComponent } from './credit-card.component';

@NgModule({
  declarations: [CreditCardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
