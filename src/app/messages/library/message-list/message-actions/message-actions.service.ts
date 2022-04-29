import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Injectable()
export class MessageActionsService {
  constructor(
    private _confirmDialogService: ConfirmDialogService,
    private _matBottomSheet: MatBottomSheet,
    private _matDialog: MatDialog,
  ) {}

  openDeleteConfirm(): Observable<boolean> {
    return this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Message',
        detail: 'Are you sure you want to delete message?',
      })
      .pipe(filter((v) => v));
  }
}
