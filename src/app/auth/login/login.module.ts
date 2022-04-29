import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginEffects } from './store/login.effects';

import { SocialLoginModule } from '../social-login/social-login.module';

import { LoginComponent } from './login.component';
import { LoginContainerComponent } from './login.container';
import { LoginModalModule } from './login-modal/login-modal.module';

@NgModule({
  declarations: [LoginComponent, LoginContainerComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,

    FlexLayoutModule,
    SocialLoginModule,

    EffectsModule.forFeature([LoginEffects]),
  ],
})
export class LoginModule {}
