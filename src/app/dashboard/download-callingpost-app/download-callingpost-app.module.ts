import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


import { SectionTitleModule } from '../components/section-title/section-title.module';

import { DownloadCallingpostAppComponent } from './download-callingpost-app.component';

@NgModule({
  declarations: [DownloadCallingpostAppComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatCardModule,
    MatButtonModule,
    SectionTitleModule,
  ],
  exports: [DownloadCallingpostAppComponent],
})
export class DownloadCallingpostAppModule {}
