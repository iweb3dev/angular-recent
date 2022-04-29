import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';

import { GroupBadNumbersRemoveComponent } from './group-bad-numbers-remove.component';


@NgModule({
  declarations: [GroupBadNumbersRemoveComponent],
  imports: [CommonModule, MatButtonModule, FlexLayoutModule],
})
export class GroupBadNumbersRemoveModule {}
