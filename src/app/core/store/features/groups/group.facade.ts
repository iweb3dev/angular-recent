import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app-state';
import { getAllGroupsStart } from './group.actions';
import { Group } from './group.models';
import { getAllGroups } from './group.selectors';

@Injectable({
  providedIn: 'root',
})
export class GroupFacade {
  allGroups$: Observable<Group[]> = this._store.select(getAllGroups);

  constructor(private _store: Store<AppState>) {}

  getAllGroups() {
    this._store.dispatch(getAllGroupsStart());
  }
}
