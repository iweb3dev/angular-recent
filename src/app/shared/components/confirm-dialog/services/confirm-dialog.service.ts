import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog.component';

export interface ConfirmDialogOptions {
  confirmBtn: string;
  header: string;
  detail: string;
  secondaryDetail: string;
  cancelBtn: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private _dialogRef: MatDialogRef<ConfirmDialogComponent>;
  private _next$ = new Subject<boolean>();

  constructor(private _dialog: MatDialog) {}

  showDialog(options: Partial<ConfirmDialogOptions>, disableClose = false) {
    this._dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: { ...options, next: this._next$ },
      disableClose,
    });

    return this._next$.pipe(
      take(1),
      tap(() => this.closeDialog())
    );
  }

  closeDialog() {
    this._dialogRef?.close();
  }
}
