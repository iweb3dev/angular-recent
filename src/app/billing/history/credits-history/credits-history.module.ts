import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';
import { VirtualTableModule } from 'src/app/shared/components/virtual-table/virtual-table.module';
import { VirtualListModule } from 'src/app/shared/components/virtual-list/virtual-list.module';

import { CreditsHistoryComponent } from './credits-history.component';

@NgModule({
  declarations: [CreditsHistoryComponent],
  imports: [
    CommonModule,
    LoaderModule,
    MatSortModule,
    CdkTableModule,
    ScrollingModule,
    MatTableModule,
    PaginatorModule,
    MatButtonModule,
    FlexLayoutModule,
    VirtualListModule,
    VirtualTableModule,
  ],
})
export class CreditsHistoryModule {}
