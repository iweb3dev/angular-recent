import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { INITIAL_MESSAGE_MODEL } from '@shared/constants/message.constants';
import { objectDelta } from '@shared/utils/object/object-delta';

import { NewMessageFacade } from './features/new-message/new-message.facade';
@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanActivate {
  constructor(
    private _newMessageFacade: NewMessageFacade,
    private _confirmDialogService: ConfirmDialogService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this._newMessageFacade.messageState$.pipe(
      switchMap((messageData) => {
        const hasRecipients = messageData.messageRecipients.length !== 0;
        const hasName =
          messageData.message.messageName !== null &&
          messageData.message.messageName !== '';
        const hasFormatSelected = !!messageData.notificationFormatValue;


        const hasMessageData = !!objectDelta(
          INITIAL_MESSAGE_MODEL, messageData.message, ['callerId', 'phoneMicrophoneMessage', 'phoneUploadedMessage']
        );

        const hasPhoneUploadedData = !!objectDelta(
          INITIAL_MESSAGE_MODEL.phoneUploadedMessage, messageData.message.phoneUploadedMessage
        );

        const hasMicrophoneUploadedData = !!objectDelta(
          INITIAL_MESSAGE_MODEL.phoneMicrophoneMessage, messageData.message.phoneMicrophoneMessage
        );

        const hasChanges = (
          hasRecipients || hasName || hasFormatSelected || hasMessageData || hasPhoneUploadedData || hasMicrophoneUploadedData
        );

        return hasChanges
          ? this._confirmDialogService.showDialog({
            confirmBtn: 'Confirm',
            header: 'You have unsaved changes.',
            detail: 'Are you sure you want to navigate away without saving?',
          }).pipe(tap((result) => {
            if (result) {
              this._newMessageFacade.resetMessageState();
            }
          }))
          : of(true);
      }),
    );
  }
}
