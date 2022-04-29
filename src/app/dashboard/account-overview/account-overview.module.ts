import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionTitleModule } from '../components/section-title/section-title.module';
import { SectionWidgetModule } from '../components/section-widget/section-widget.module';

import { AccountOverviewComponent } from './account-overview.component';
import { SectionWidgetMobileModule } from '../components/section-widget-mobile/section-widget-mobile.module';

@NgModule({
  declarations: [AccountOverviewComponent],
  imports: [
    CommonModule,
    SectionWidgetModule,
    SectionWidgetMobileModule,
    SectionTitleModule,
  ],
  exports: [AccountOverviewComponent],
})
export class AccountOverviewModule {}
