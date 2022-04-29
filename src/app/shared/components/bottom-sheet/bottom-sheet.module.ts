import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BottomSheetComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [BottomSheetComponent]
})
export class BottomSheetModule {
}
