import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyPhoneMobileComponent } from './verify-phone.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetModule } from '../../bottom-sheet/bottom-sheet.module';
import { VerifyPhoneSharedModule } from '../shared/verify-phone-shared.module';

@NgModule({
  declarations: [
    VerifyPhoneMobileComponent
    ],
  imports: [
    CommonModule,
    BottomSheetModule,
    MatBottomSheetModule,
    VerifyPhoneSharedModule
  ]
})
export class VerifyPhoneMobileModule {}
