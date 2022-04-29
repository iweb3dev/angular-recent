import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  retry,
  share,
  switchMap,
  takeUntil,
  takeWhile,
} from 'rxjs/operators';

import { CallMePayload } from 'src/app/api/messages/messages.models';
import { MessagesService } from 'src/app/api/messages/messages.service';
import { CallMeRecordingStatuses } from 'src/app/shared/models/message/call-me-recording.models';
import { CallMeResponseModel } from './call-me.models';

@Injectable({
  providedIn: 'root',
})
export class CallMeService {
  private _stopPolling = new Subject<void>();
  constructor(private _messagesService: MessagesService) {}

  stopPolling(): void {
    this._stopPolling.next();
  }

  initiateCallIn(payload: CallMePayload): Observable<CallMeResponseModel> {
    return this._messagesService.callIn(payload).pipe(
      switchMap((callId) =>
        this.pollCallMe(callId).pipe(
          distinctUntilChanged(),
          map((status) => ({ status, callId })),
        ),
      ),
    );
  }

  private pollCallMe(id: string): Observable<CallMeRecordingStatuses> {
    return timer(1000, 2000).pipe(
      switchMap(() => this._messagesService.fetchCallMeStatus(id)),
      retry(),
      takeWhile(
        (status) =>
          status !== CallMeRecordingStatuses.FinishedNoRecording &&
          status !== CallMeRecordingStatuses.RecordingComplete,
        true,
      ),
      takeUntil(this._stopPolling),
      share(),
    );
  }
}
