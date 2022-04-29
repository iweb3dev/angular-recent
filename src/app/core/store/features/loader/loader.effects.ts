import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  showLoader,
  removeLoader,
  showDetachedLoader,
  removeAttachedLoader,
} from './loader.actions';

import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable({ providedIn: 'root' })
export class LoaderEffects {
  showLoader$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showLoader),
        tap(() => this._loaderService.showLoader())
      ),
    {
      dispatch: false,
    }
  );

  removeLoader$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeLoader),
        tap(() => this._loaderService.removeLoader())
      ),
    {
      dispatch: false,
    }
  );

  showDetachedLoader$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(showDetachedLoader),
        tap(() => this._loaderService.showDetachedLoader())
      ),
    {
      dispatch: false,
    }
  );

  removeAttachedLoader$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeAttachedLoader),
        tap(() => this._loaderService.removeAttachedLoader())
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private _loaderService: LoaderService
  ) {}
}
