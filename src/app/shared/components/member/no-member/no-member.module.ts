import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoMemberComponent } from './no-member.component';

@NgModule({
  declarations: [NoMemberComponent],
  imports: [CommonModule],
  exports: [NoMemberComponent],
})
export class NoMemberModule {}
