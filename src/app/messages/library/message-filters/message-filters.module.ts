import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';

import { MessageFiltersComponent } from './message-filters.component';
import { MessageFiltersService } from './message-filters.service';
import { FiltersSheetComponent } from './filters/filters-sheet/filters-sheet.component';
import { FiltersDesktopComponent } from './filters/filters-desktop/filters-desktop.component';

@NgModule({
  declarations: [
    MessageFiltersComponent,
    FiltersSheetComponent,
    FiltersDesktopComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    OverlayModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    BottomSheetModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [MessageFiltersComponent],
  providers: [MessageFiltersService],
})
export class MessageFiltersModule {}
