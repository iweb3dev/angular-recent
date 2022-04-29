import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Http } from '../../core/http/http.service';

import { FinancialsService } from 'src/app/api/financials/financials.service';
import { CREATE_GROUP_MANAGERS, DELETE_GROUP_MANAGERS, GET_ALL_GROUP_MANAGERS, UPDATE_GROUP_MANAGERS } from './group-managers.api';
import { GroupManagers } from './group-managers.models';

@Injectable({
  providedIn: 'root',
})
export class GroupManagersService {
  constructor(
    private _Http: Http,
    private _financialsService: FinancialsService
  ) {}

  getGroupManagers(): Observable<GroupManagers[]> {
    return this._Http.get(GET_ALL_GROUP_MANAGERS);
  }

  createGroupManagers(createGroupManagerData) {
    return this._Http.post(CREATE_GROUP_MANAGERS, createGroupManagerData);
  }

  updateGroupManagers(updateGroupManagerData) {
    return this._Http.put(UPDATE_GROUP_MANAGERS, updateGroupManagerData);
  }

  deleteGroupManager(id) {
    return this._Http.delete(DELETE_GROUP_MANAGERS(id));
  }

}
