import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewMessageStateModel } from 'src/app/core/store/features/new-message/new-message.models';

import { communicationConfirm, scheduleMessage, communicationCancel } from './confirm.actions';
import {
  selectCommunicationId,
  selectCommunicationQueue,
  selectPhoneMessageLength,
  selectScheduleOptions,
  selectSystemSettings,
} from './confirm.selectors';

@Injectable({ providedIn: 'root' })
export class ConfirmFacade {
  communicationQueue$ = this._store.select(selectCommunicationQueue);
  phoneMessageLength$ = this._store.select(selectPhoneMessageLength);
  communicationId$ = this._store.select(selectCommunicationId);
  scheduleOptions$ = this._store.select(selectScheduleOptions);
  userSystemSettings$ = this._store.select(selectSystemSettings);

  constructor(private _store: Store<NewMessageStateModel>) {}

  communicationConfirm(): void {
    this._store.dispatch(communicationConfirm());
  }

  scheduleMessage(isMobileView: { isMobileView: boolean }): void {
    this._store.dispatch(scheduleMessage(isMobileView));
  }

  communicationCancel(
    communicationId: number,
    searchCriteria: string,
    groupId?: number,
    historyTypeId?: number,
    pageSize?: number,
    pageIndex?: number) {
    this._store.dispatch(communicationCancel(
      {
        communicationId,
        searchCriteria,
        groupId,
        historyTypeId,
        pageSize,
        pageIndex
      }
    ));
  }
}
