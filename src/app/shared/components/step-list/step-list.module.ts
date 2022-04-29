import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepListComponent } from './step-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [StepListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [StepListComponent],
})
export class StepListModule {}
