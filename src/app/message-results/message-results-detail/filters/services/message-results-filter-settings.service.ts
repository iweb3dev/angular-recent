import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MessageResultsSettingsDesktopComponent } from '../desktop/message-results-settings-desktop.component';
import { MessageResultsSettingsMobileComponent } from '../mobile/message-results-settings-mobile.component';

@Injectable({
  providedIn: 'root',
})
export class MessageResultsSettingsService {
  _dialogRef: MatDialogRef<MessageResultsSettingsDesktopComponent>;
  private _next$ = new Subject();
  _bottomSheetRef: MatBottomSheetRef<MessageResultsSettingsMobileComponent>;

  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) {}

  open() {
    if (window.innerWidth > 1000) {
      this._dialogRef = this._dialog.open(
        MessageResultsSettingsDesktopComponent,
        {
          width: '300px',
          data: {
            next: this._next$,
          },
        },
      );
    } else {
      this._bottomSheetRef = this._bottomSheet.open(
        MessageResultsSettingsMobileComponent,
        {
          data: {
            next: this._next$,
          },
        },
      );
    }

    return this._next$.pipe(
      take(1),
      tap(() => this.close()),
    );
  }

  close() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }

    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss();
    }
  }
}
