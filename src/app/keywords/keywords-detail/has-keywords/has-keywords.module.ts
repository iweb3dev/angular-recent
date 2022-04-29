import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'src/app/shared/components/confirm-dialog/confirm-dialog.module';
import { HasKeywordsComponent } from './has-keywords.component';
import {MatDividerModule} from '@angular/material/divider';
import { KeywordsListModule } from './keywords-list/keywords-list.module';
import { MoreActionsModule } from './more-actions/more-actions.module';

@NgModule({
  declarations: [HasKeywordsComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    FormsModule,
    ConfirmDialogModule,
    KeywordsListModule,
    MoreActionsModule,
  ],
  exports: [HasKeywordsComponent]
})
export class HasKeywordsModule {}
