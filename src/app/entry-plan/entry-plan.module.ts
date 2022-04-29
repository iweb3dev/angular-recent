import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EntryPlanComponent } from './entry-plan.component';
import { SubmitPlanModule } from './submit-plan/submit-plan.module';
import { SubmitPlanComponent } from './submit-plan/submit-plan.component';
import { SelectPlanComponent } from './select-plan/select-plan.component';
import { SubmitPlanResolver } from './submit-plan/submit-plan.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'select-plan',
      },
      {
        path: 'select-plan',
        component: SelectPlanComponent,
      },
      {
        path: 'submit-plan',
        component: SubmitPlanComponent,
        resolve: { packageFeatures: SubmitPlanResolver },
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [EntryPlanComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SubmitPlanModule],
  providers: [SubmitPlanResolver],
})
export class EntryPlanModule {}
