import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageResultsSettingsComponent } from './message-results-settings.component';
import { MessageResultsSettingsMobileComponent } from './mobile/message-results-settings-mobile.component';
import { MessageResultsSettingsDesktopComponent } from './desktop/message-results-settings-desktop.component';
import { BottomSheetModule } from 'src/app/shared/components/bottom-sheet/bottom-sheet.module';
import { MatSelectModule } from '@angular/material/select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [MessageResultsSettingsComponent, MessageResultsSettingsMobileComponent, MessageResultsSettingsDesktopComponent],
  imports: [
    CommonModule,
    BottomSheetModule,
    FlexLayoutModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class MessageResultsSettingsModule {}
