import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { ErrorInterceptor } from './http/error-interceptor.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCore from './store/core.store';
import { ToastModule } from '../shared/components/toast/toast.module';
import { VerifyPhoneModule } from '../shared/components/verify-phone/verify-phone.module';
import { LoaderModule } from '../shared/components/loader/loader.module';

@NgModule({
  declarations: [],
  imports: [
    ToastModule,
    LoaderModule,
    CommonModule,
    HttpClientModule,
    MainLayoutModule,
    VerifyPhoneModule,
    StoreModule.forFeature(fromCore.featureStore, fromCore.reducers),
    EffectsModule.forFeature(fromCore.effects),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CoreModule {}
