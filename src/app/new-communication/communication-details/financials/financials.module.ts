import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FinancialsComponent } from './financials.component';
import { GoUnlimitedModule } from './go-unlimited/go-unlimited.module';
import { AddCreditsModule } from './add-credits/add-credits.module';
import { FinancialsActionsService } from './financials-actions.service';

@NgModule({
  declarations: [FinancialsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AddCreditsModule,
    FlexLayoutModule,
    GoUnlimitedModule,
  ],
  exports: [FinancialsComponent],
  providers: [FinancialsActionsService],
})
export class FinancialsModule {}
