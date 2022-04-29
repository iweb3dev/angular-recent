import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteNames } from '../shared/models/enums/route-names';

import { CustomPhoneNumbersComponent } from './custom-phone-numbers.component';
import { PhoneNumbersResolver } from './phone-numbers.resolver';

const routes: Routes = [
  {
    path: '',
    component: CustomPhoneNumbersComponent,
    data: {
      routeName: `My ${RouteNames.CustomPhone}`,
    },
    children: [
      {
        path: '',
        resolve: { phone_numbers: PhoneNumbersResolver },
        loadChildren: () =>
          import('./custom-numbers-detail/custom-numbers-detail.module').then(
            (m) => m.CustomNumbersDetailModule,
          ),
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomPhoneNumbersRoutingModule {}
