import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { SurveyNewComponent } from './components/survey-new/survey-new.component';
import { SurveyComponent } from './components/survey/survey.component';

import { SmsPollingComponent } from './sms-polling.component';
import { SmsPollingRoutingModule } from './sms-polling.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatRadioModule,
    SmsPollingRoutingModule
  ],
  declarations: [
    SmsPollingComponent,
    SurveyComponent,
    SurveyNewComponent
  ],
})
export class SmsPollingModule {}
