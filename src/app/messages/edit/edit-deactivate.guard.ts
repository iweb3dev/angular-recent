import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { objectDelta } from '@shared/utils/object/object-delta';

import { EditComponent } from './edit.component';
import { MessageModel } from '@shared/models/message/message.models';

@Injectable()
export class CanDeactivateEdit implements CanDeactivate<EditComponent> {
  constructor(private _confirmDialogService: ConfirmDialogService) {}

  canDeactivate(
    component: EditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const snapshot = {
      ...currentRoute.data.message.message,
      notificationFormatValue: currentRoute.data.message.notificationFormatValue,
    };

    const changedMessage = {
      ...component.messageData.message,
      ...component.textMessageData,
      ...component.emailMessageData,
      ...component.voiceMessageData,
      notificationFormatValue: component.notificationFormatValue,
    };

    const hasChanges = this.findIfHasChanges(snapshot, changedMessage);

    return hasChanges && !component.isSaved
      ? this._confirmDialogService.showDialog({
        confirmBtn: 'Confirm',
        header: 'You have unsaved changes.',
        detail: 'Are you sure you want to navigate away without saving?',
      })
      : of(true);
  }

  private findIfHasChanges(originalMessage: MessageModel, changedMessage: MessageModel): boolean {
    const hasMessageChanges = !!objectDelta(changedMessage, originalMessage, ['phoneMicrophoneMessage', 'phoneUploadedMessage']);

    const hasPhoneMicrophoneChanges = !!objectDelta(changedMessage.phoneMicrophoneMessage, originalMessage.phoneMicrophoneMessage);

    const hasPhoneUploadedChanges = !!objectDelta(changedMessage.phoneUploadedMessage, originalMessage.phoneUploadedMessage);

    return hasMessageChanges || hasPhoneMicrophoneChanges || hasPhoneUploadedChanges;
  }
}
