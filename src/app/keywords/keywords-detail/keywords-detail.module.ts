import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordsDetailComponent } from './keywords-detail.component';

import { RouterModule } from '@angular/router';
import { NoKeywordsModule } from './no-keywords/no-keywords.module';
import { HasKeywordsModule } from './has-keywords/has-keywords.module';

@NgModule({
  declarations: [KeywordsDetailComponent],
  imports: [
    CommonModule,
    RouterModule,
    HasKeywordsModule,
    NoKeywordsModule
  ]
})
export class KeywordsDetailModule {}
