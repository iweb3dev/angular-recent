import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { BottomSheetModule } from '../../components/bottom-sheet/bottom-sheet.module';
import { SearchExpandedModule } from '../search-expanded/search-expanded.module';

import { MobileChipsSelectorComponent } from './mobile-chips-selector.component';
import { ChipsSheetSelectorComponent } from './chips-sheet-selector/chips-sheet-selector.component';

@NgModule({
  declarations: [MobileChipsSelectorComponent, ChipsSheetSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    BottomSheetModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SearchExpandedModule,
  ],
  exports: [MobileChipsSelectorComponent],
})
export class MobileChipsSelectorModule {}
