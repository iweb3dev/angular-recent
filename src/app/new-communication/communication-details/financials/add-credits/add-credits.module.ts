import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { PaymentModule } from 'src/app/components/payment/payment.module';
import { PromoModule } from 'src/app/components/promo/promo.module';

import { AddCreditsSheetComponent } from './sheet/add-credits-sheet.component';
import { AddCreditsDialogComponent } from './dialog/add-credits-dialog.component';
import { AddCreditsService } from './add-credits.service';

@NgModule({
  declarations: [AddCreditsSheetComponent, AddCreditsDialogComponent],
  imports: [
    PromoModule,
    CommonModule,
    MatIconModule,
    PaymentModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    BottomSheetModule,
    MatFormFieldModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [AddCreditsService],
})
export class AddCreditsModule {}
