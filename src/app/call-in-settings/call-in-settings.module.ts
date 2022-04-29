import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallInSettingsRoutingModule } from './call-in-settings.routes';
import { CallInSettingsComponent } from './call-in-settings.component';
import { CallInSettingsDetailModule } from './detail/call-in-settings-detail.module';

@NgModule({
  declarations: [CallInSettingsComponent],
  imports: [
    CommonModule,
    CallInSettingsRoutingModule,
    CallInSettingsDetailModule
  ],
})
export class CallInSettingsModule {}
