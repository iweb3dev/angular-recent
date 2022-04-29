import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetModule } from '../../bottom-sheet/bottom-sheet.module';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyNumberComponent } from './verify-number/verify-number.component';
import { ChooseNumberComponent } from './choose-number/choose-number.component';
import { LoaderModule } from '@shared/components/loader/loader.module';

@NgModule({
  declarations: [VerifyNumberComponent, ChooseNumberComponent],
  imports: [
    CommonModule,
    LoaderModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    BottomSheetModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
  ],
  exports: [VerifyNumberComponent, ChooseNumberComponent],
})
export class VerifyPhoneSharedModule {}
