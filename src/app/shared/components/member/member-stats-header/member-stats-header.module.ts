import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDividerModule } from '@angular/material/divider';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MemberStatsHeaderComponent } from './member-stats-header.component';

@NgModule({
  declarations: [MemberStatsHeaderComponent],
  imports: [CommonModule, MatDividerModule, FlexLayoutModule],
  exports: [MemberStatsHeaderComponent],
})
export class MemberStatsHeaderModule {}
