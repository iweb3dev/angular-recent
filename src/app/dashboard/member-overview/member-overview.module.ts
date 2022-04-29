import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionTitleModule } from '../components/section-title/section-title.module';
import { SectionWidgetModule } from '../components/section-widget/section-widget.module';

import { MemberOverviewComponent } from './member-overview.component';
import { SectionWidgetMobileModule } from '../components/section-widget-mobile/section-widget-mobile.module';

@NgModule({
  declarations: [MemberOverviewComponent],
  imports: [
    CommonModule,
    SectionWidgetModule,
    SectionTitleModule,
    SectionWidgetMobileModule,
  ],
  exports: [MemberOverviewComponent],
})
export class MemberOverviewModule {}
