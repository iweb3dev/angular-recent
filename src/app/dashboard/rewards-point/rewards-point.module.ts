import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxGaugeModule } from 'ngx-gauge';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SectionTitleModule } from '../components/section-title/section-title.module';

import { RewardsPointComponent } from './rewards-point.component';


@NgModule({
  declarations: [RewardsPointComponent],
  imports: [
    CommonModule,
    NgxGaugeModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    SectionTitleModule,
  ],
  exports: [RewardsPointComponent],
})
export class RewardsPointModule {}
