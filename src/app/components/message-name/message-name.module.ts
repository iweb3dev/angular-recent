import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { MultiSelectModule } from 'src/app/shared/components/multi-select/multi-select.module';
import { ChipsAutocompleteModule } from 'src/app/shared/forms/chips-autocomplete/chips-autocomplete.module';
import { MobileChipsSelectorModule } from 'src/app/shared/forms/mobile-chips-selector/mobile-chips-selector.module';

import { MessageNameComponent } from './message-name.component';
import { MessageNameService } from './message-name.service';


@NgModule({
  declarations: [MessageNameComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MultiSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatDividerModule,
    ChipsAutocompleteModule,
    MobileChipsSelectorModule,
  ],
  exports: [MessageNameComponent],
  providers: [MessageNameService],
})
export class MessageNameModule {}
