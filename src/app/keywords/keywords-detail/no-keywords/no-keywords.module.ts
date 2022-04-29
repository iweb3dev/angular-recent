import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NoKeywordsComponent } from './no-keywords.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LearnMoreDialogComponent } from './components/learn-more-dialog/learn-more-dialog.component';


@NgModule({
  declarations: [NoKeywordsComponent, LearnMoreDialogComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [NoKeywordsComponent]
})
export class NoKeywordsModule {}
