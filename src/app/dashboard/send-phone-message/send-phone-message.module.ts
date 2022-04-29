import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';

import { SectionTitleModule } from '../components/section-title/section-title.module';

import { SendPhoneMessageComponent } from './send-phone-message.component';

@NgModule({
  declarations: [SendPhoneMessageComponent],
  imports: [CommonModule, FlexLayoutModule, MatCardModule, SectionTitleModule],
  exports: [SendPhoneMessageComponent],
})
export class PhoneMessageModule {}
