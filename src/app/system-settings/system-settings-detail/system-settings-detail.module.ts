import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemSettingsDetailComponent } from './system-settings-detail.component';
import { CommunicationSettingsComponent } from './components/communication-settings/communication-settings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MemberSettingsComponent } from './components/member-settings/member-settings.component';
import { ExtraSettingsComponent } from './components/extra-settings/extra-settings.component';
import { HelpPromptComponent } from './components/help-prompt/help-prompt.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SystemSettingFrameComponent } from './components/system-setting-frame/system-setting-frame.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SystemSettingsDetailsRoutingModule } from './system-settings-detail.routes';

@NgModule({
  declarations: [
    SystemSettingsDetailComponent,
    CommunicationSettingsComponent,
    MemberSettingsComponent,
    ExtraSettingsComponent,
    HelpPromptComponent,
    SystemSettingFrameComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatTooltipModule,
    MatProgressBarModule,
    SystemSettingsDetailsRoutingModule,
  ],
})
export class SystemSettingsDetailModule {}
