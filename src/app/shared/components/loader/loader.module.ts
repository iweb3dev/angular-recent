import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, OverlayModule, MatCardModule, MatProgressBarModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}
