import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';

import { SectionTitleModule } from '../components/section-title/section-title.module';

import { CommunicationGroupFilterPipe } from '../pipes/communication-group-filter.pipe';
import { CommunicationStatusFilterPipe } from '../pipes/communication-status-filter.pipe';

import { RecentMessageResultsComponent } from './recent-message-results.component';

@NgModule({
  declarations: [
    RecentMessageResultsComponent,

    CommunicationGroupFilterPipe,
    CommunicationStatusFilterPipe,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FlexLayoutModule,

    MatCardModule,
    SectionTitleModule,
  ],
  exports: [RecentMessageResultsComponent],
})
export class RecentMessageResultsModule {}
