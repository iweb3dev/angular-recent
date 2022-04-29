import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentYearModule } from '@shared/components/current-year/current-year.module';

import { AuthFooterComponent } from './auth-footer.component';

@NgModule({
  declarations: [AuthFooterComponent],
  imports: [CommonModule, FlexLayoutModule, CurrentYearModule],
  exports: [AuthFooterComponent],
})
export class AuthFooterModule {}
