import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemSettingsRoutingModule } from './system-settings.routes';
import { SystemSettingsComponent } from './system-settings.component';

@NgModule({
  declarations: [SystemSettingsComponent],
  imports: [CommonModule, SystemSettingsRoutingModule],
  exports: [SystemSettingsComponent],
})
export class SystemSettingsModule {}
