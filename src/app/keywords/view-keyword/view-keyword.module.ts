import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { ViewKeywordComponent } from './view-keyword.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [ViewKeywordComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ClipboardModule,
    RouterModule,
    ReactiveFormsModule,
    LoaderModule,
  ],
})
export class ViewKeywordModule {}
