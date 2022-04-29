import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { VerifyPhoneDesktopComponent } from './verify-phone.component';
import { VerifyPhoneSharedModule } from '../shared/verify-phone-shared.module';

@NgModule({
  declarations: [
    VerifyPhoneDesktopComponent
    ],
  imports: [
    CommonModule,
    MatDialogModule,
    VerifyPhoneSharedModule
  ]
})
export class VerifyPhoneDesktopModule {}
