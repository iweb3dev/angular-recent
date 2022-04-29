import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { FlexLayoutModule } from '@angular/flex-layout';

import { PipesModule } from '@shared/pipes/pipes.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { PaginatorModule } from 'src/app/shared/components/paginator/paginator.module';

import { PurchasesHistoryComponent } from './purchases-history.component';

@NgModule({
  declarations: [PurchasesHistoryComponent],
  imports: [
    CommonModule,

    MatSortModule,
    MatTableModule,
    MatButtonModule,

    PipesModule,
    LoaderModule,
    PaginatorModule,
    FlexLayoutModule,
  ],
})
export class PurchaseHistoryModule {}
