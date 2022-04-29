import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SystemEmail } from './emails.models';
import { SEND_GROUP_PAGE_CONTACT_US_EMAIL } from './emails.api';

@Injectable({
  providedIn: 'root',
})
export class EmailsService {
  constructor(private _httpClient: HttpClient) {}

  sendGroupPageContactUsEmail(
    groupId: number,
    systemEmail: SystemEmail,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(
      SEND_GROUP_PAGE_CONTACT_US_EMAIL(groupId),
      systemEmail,
    );
  }
}
