import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { CreditsComponent } from './credits.component';
import { CreditsRoutingModule } from './credits.routes';
import { CreditsService } from './credits.service';
import { PurchaseCreditsModule } from './purchase-credits/purchase-credits.module';

@NgModule({
  declarations: [CreditsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    MatDividerModule,
    ReactiveFormsModule,
    CreditsRoutingModule,
    MatBottomSheetModule,
    PurchaseCreditsModule,
  ],
  providers: [CreditsService],
})
export class CreditsModule {}
