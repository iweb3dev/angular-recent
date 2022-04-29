import { NgModule } from '@angular/core';
import { VerifyPhoneDesktopModule } from './desktop/verify-phone-desktop.module';
import { VerifyPhoneMobileModule } from './mobile/verify-phone-mobile.module';

@NgModule({
  imports: [
    VerifyPhoneDesktopModule,
    VerifyPhoneMobileModule
  ],
  exports: [
    VerifyPhoneDesktopModule,
    VerifyPhoneMobileModule
  ]
})
export class VerifyPhoneModule {}
