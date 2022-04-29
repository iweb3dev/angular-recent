import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { EmailSubscribeComponent } from './email-subscribe.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VerifysubscribeComponent } from './components/verifysubscribe/verifysubscribe.component';

export const routes: Routes = [
  {
    path: '',
    component: EmailSubscribeComponent,
    children: [
      {
        path: 'subscribe',
        component: SubscribeComponent
      },
      {
        path: 'unsubscribe',
        component: UnsubscribeComponent
      },
      {
        path: 'verifysubscribe',
        component: VerifysubscribeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSubscribeRoutingModule {}
