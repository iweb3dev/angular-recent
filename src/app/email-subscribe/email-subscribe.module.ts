import { UnsubscribeComponent } from './components/unsubscribe/unsubscribe.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { CommonModule } from '@angular/common';
import { EmailSubscribeRoutingModule } from './email-subscribe.component.routes';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { EmailSubscribeComponent } from './email-subscribe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VerifysubscribeComponent } from './components/verifysubscribe/verifysubscribe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    EmailSubscribeRoutingModule,
    FlexLayoutModule,
    MatInputModule
  ],
  declarations: [
    EmailSubscribeComponent,
    SubscribeComponent,
    UnsubscribeComponent,
    VerifysubscribeComponent
  ],
})
export class EmailSubscribeModule {}
