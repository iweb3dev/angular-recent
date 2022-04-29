import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from '@shared/components/confirm-dialog/services/confirm-dialog.service';
import { Observable } from 'rxjs';

import { MessageCreatedComponent } from './message-created/message-created.component';

@Injectable({
  providedIn: 'root',
})
export class MessageLibraryDetailsService {
  constructor(
    private _matDialog: MatDialog,
    private _confirmDialogService: ConfirmDialogService,
  ) {}

  openMessageCreateDialog(): Observable<boolean> {
    return this._matDialog
      .open(MessageCreatedComponent, { width: '550px' })
      .afterClosed();
  }

  openConfirmMessageSendDialog() {
    return this._confirmDialogService.showDialog({
      confirmBtn: 'YES',
      header: 'Message Created',
      detail:
        'Congratulations! Your message has been created and saved to your message library!',
      secondaryDetail: 'Would you like to send or schedule your message now?',
      cancelBtn: 'NO',
    });
  }
}
