import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

import { PaymentModule } from 'src/app/components/payment/payment.module';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { PromoModule } from 'src/app/components/promo/promo.module';

import { GoUnlimitedSheetComponent } from './sheet/go-unlimited-sheet.component';
import { GoUnlimitedDialogComponent } from './dialog/go-unlimited-dialog.component';
import { GoUnlimitedService } from './go-unlimited.service';

@NgModule({
  declarations: [GoUnlimitedSheetComponent, GoUnlimitedDialogComponent],
  imports: [
    PromoModule,
    CommonModule,
    MatIconModule,
    PaymentModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    BottomSheetModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  providers: [GoUnlimitedService],
})
export class GoUnlimitedModule {}
