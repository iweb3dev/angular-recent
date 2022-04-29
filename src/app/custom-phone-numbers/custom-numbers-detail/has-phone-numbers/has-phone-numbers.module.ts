import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HasPhoneNumbersComponent } from './has-phone-numbers.component';
import { MoreActionsModule } from './more-actions/more-actions.module';
import { SearchModule } from 'src/app/shared/components/search/search.module';
import { PhoneNumbersListComponent } from './phone-numbers-list/phone-numbers-list.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { CallDialogComponent } from './phone-numbers-list/call-dialog/call-dialog.component';
import { CallSheetComponent } from './phone-numbers-list/call-sheet/call-sheet.component';
import { PurchasePhoneNumbersModule } from 'src/app/domain/purchase-phone-numbers/purchase-phone-numbers.module';

@NgModule({
  declarations: [
    HasPhoneNumbersComponent,
    PhoneNumbersListComponent,
    CallDialogComponent,
    CallSheetComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    SearchModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatBottomSheetModule,
    MoreActionsModule,
    PipesModule,
    PurchasePhoneNumbersModule,
  ],
  exports: [HasPhoneNumbersComponent],
})
export class HasPhoneNumbersModule {}
