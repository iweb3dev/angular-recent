import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { ChipsAutocompleteComponent } from './chips-autocomplete.component';

@NgModule({
  declarations: [ChipsAutocompleteComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  exports: [ChipsAutocompleteComponent],
})
export class ChipsAutocompleteModule {}
