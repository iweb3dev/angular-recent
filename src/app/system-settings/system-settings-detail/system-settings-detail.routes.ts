import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemSettingsDetailComponent } from './system-settings-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SystemSettingsDetailComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingsDetailsRoutingModule {}
