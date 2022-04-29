import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { SearchExpandedModule } from 'src/app/shared/forms/search-expanded/search-expanded.module';

import { HistoryComponent } from './history.component';
import { HistoryRoutingModule } from './history.routes';
import { HistoryService } from './history.service';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    PaginatorModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SearchExpandedModule,
    HistoryRoutingModule,
  ],
  providers: [HistoryService],
})
export class HistoryModule {}
