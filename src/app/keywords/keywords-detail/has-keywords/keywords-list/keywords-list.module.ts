import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { KeywordsListComponent } from './keywords-list.component';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [KeywordsListComponent],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,

    OverlayModule,
    ScrollingModule,
    FlexLayoutModule,
    ConfirmDialogModule,

    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
  ],
  exports: [KeywordsListComponent]
})
export class KeywordsListModule {}
