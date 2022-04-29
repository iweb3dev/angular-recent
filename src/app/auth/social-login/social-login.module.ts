import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { PipesModule } from '@shared/pipes/pipes.module';

import { SocialLoginEffects } from './store/social-login.effects';

import { SocialLoginCardComponent } from './social-login-card/social-login-card.component';
import { SocialUserRegisteredComponent } from './social-user-registered/social-user-registered.component';

@NgModule({
  declarations: [SocialLoginCardComponent, SocialUserRegisteredComponent],
  imports: [
    CommonModule,

    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,

    FlexLayoutModule,

    PipesModule,

    EffectsModule.forFeature([SocialLoginEffects]),
  ],
  exports: [SocialLoginCardComponent, SocialUserRegisteredComponent],
})
export class SocialLoginModule {}
