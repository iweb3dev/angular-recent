import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { SaveVolunteerSheet } from '../events/events.models';

import { GET_VOLUNTEER_ROLE_TESTING } from './roles.api';

@Injectable({
  providedIn: 'root',
})


export class RolesService {

  constructor(private _http: Http) {}

  getVolunteerRoleTesting(volunteerSheetId: number):
    Observable<SaveVolunteerSheet> {
    return this._http
      .get<SaveVolunteerSheet>(GET_VOLUNTEER_ROLE_TESTING(volunteerSheetId));
  }

}
