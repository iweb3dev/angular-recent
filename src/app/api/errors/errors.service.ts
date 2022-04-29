import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import { ClientSideErrors, ClientOrigin, DtoLog } from './errors.models';
import { CLIENT_SIDE_ERRORS, CLIENT_SIDE_ORIGIN } from './errors.api';

@Injectable({
  providedIn: 'root'
})

export class ErrorsService {
  constructor(private _Http: Http) {}

  // Service for logging client side errors into the database
  clientSideErrors(clientErrors: ClientSideErrors): Observable<boolean> {
    return this._Http
      .post<boolean>(CLIENT_SIDE_ERRORS, clientErrors);
  }

  // Gets reports of client side error origin information for logging into the database
  clientSideOrigin(clientOrigin: ClientOrigin): Observable<DtoLog> {
    return this._Http
      .post<DtoLog>(CLIENT_SIDE_ORIGIN, clientOrigin);
  }
}
