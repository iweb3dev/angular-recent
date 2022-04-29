import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyNewComponent } from './components/survey-new/survey-new.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SmsPollingComponent } from './sms-polling.component';

export const routes: Routes = [
  {
    path: '',
    component: SmsPollingComponent,
    children: [
      {
        path: '',
        component: SurveyNewComponent
      },
      {
        path: 'new',
        component: SurveyComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsPollingRoutingModule {}
