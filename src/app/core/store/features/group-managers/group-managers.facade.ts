import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { Update } from '@ngrx/entity';
import { getAllGroupManagers } from './group-managers.selectors';
import { getAllGroupManagersStart } from './group-managers.actions';

@Injectable({
  providedIn: 'root'
})

export class GroupManagersFacade {
  allGroupManagers$ = this._store.select(getAllGroupManagers);

  constructor(private _store: Store<AppState>,
    private _actions$: Actions) {}

  fetchGroupManagers() {
    this._store.dispatch(getAllGroupManagersStart());
  }

}
