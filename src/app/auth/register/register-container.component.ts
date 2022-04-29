import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';

import { AppState } from 'src/app/store/app-state';

import { RegisterFormModel } from './register.models';
import { register } from './store/register.actions';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
})
export class RegisterContainerComponent implements OnInit {
  constructor(
    private _store: Store<AppState>,
    private _loaderFacade: LoaderFacade,
  ) {}

  ngOnInit(): void {}

  onRegister(registerData: RegisterFormModel): void {
    this._loaderFacade.showLoader();
    this._store.dispatch(register({ registerData }));
  }
}
