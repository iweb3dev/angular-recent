import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { DashboardToolbarComponent } from './dashboard-toolbar.component';

@NgModule({
  declarations: [DashboardToolbarComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatCardModule],
  exports: [DashboardToolbarComponent],
})
export class DashboardToolbarModule {}
