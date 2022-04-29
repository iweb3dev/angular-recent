import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { PlanDetailsTableComponent } from './plan-details-table.component';
import { PlanDetailsTableDesktopComponent } from './plan-details-table-desktop/plan-details-table-desktop.component';
import { PlanDetailsTableMobileComponent } from './plan-details-table-mobile/plan-details-table-mobile.component';

@NgModule({
  declarations: [
    PlanDetailsTableComponent,
    PlanDetailsTableDesktopComponent,
    PlanDetailsTableMobileComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  exports: [PlanDetailsTableComponent],
})
export class PlanDetailsTableModule {}
