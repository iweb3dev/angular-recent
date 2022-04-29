import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { LocalStorageService } from './core/storage/local-storage.service';
import * as fromRouter from './store/router/router.store';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { logout } from './core/store/features/user/user-logout.reducer';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from 'angularx-social-login';
import { IntercomModule } from 'ng-intercom';
import { MatBadgeModule } from '@angular/material/badge';
import { KeywordMemberInformationComponent } from './keyword-member-information/keyword-member-information.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const googleLoginOptions = {
  redirect_uri: environment.socialUri.googleRedirectUri,
  scope: 'profile email',
};

const faceBookLoginOptions = {
  redirect_uri: environment.socialUri.facebookRedirectUri,
  scope:
    'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  version: 'v2.11',
};

@NgModule({
  declarations: [
    AppComponent,
    KeywordMemberInformationComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    StoreModule.forRoot(fromRouter.reducers, { metaReducers: [logout] }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    IntercomModule.forRoot({
      appId: 'swnwowpj',
      updateOnRouterChange: true,
    }),
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatBadgeModule,
    FlexLayoutModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    LocalStorageService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.socialKeys.googleClientId,
              googleLoginOptions,
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              environment.socialKeys.facebookClientId,
              faceBookLoginOptions,
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
