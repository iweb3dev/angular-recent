import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/app-state';

import {
  showLoader,
  removeLoader,
  showDetachedLoader,
  removeAttachedLoader,
} from './loader.actions';

@Injectable({
  providedIn: 'root',
})
export class LoaderFacade {
  constructor(private _store: Store<AppState>) {}

  showLoader(): void {
    this._store.dispatch(showLoader());
  }

  removeLoader(): void {
    this._store.dispatch(removeLoader());
  }

  showDetachedLoader(): void {
    this._store.dispatch(showDetachedLoader());
  }

  removeAttachedLoader(): void {
    this._store.dispatch(removeAttachedLoader());
  }
}
