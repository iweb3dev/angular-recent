import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import { getAllCommunicationsStart, getCommunicationResultsStart } from './communications.actions';
import { getCommunicationResults, getLatestCommunications, getLastCommunication } from './communications.selector';


@Injectable({
  providedIn: 'root'
})
export class CommunicationsFacade {

  latestCommunications$ = this._store.select(getLatestCommunications);
  lastCommunication$ = this._store.select(getLastCommunication);
  communicationResults$ = this._store.select(getCommunicationResults);
  constructor(private _store: Store<AppState>) {}

  getAllCommunications = () => this._store.dispatch(getAllCommunicationsStart());
  getCommunicationsResults = () => this._store.dispatch(getCommunicationResultsStart());
}
