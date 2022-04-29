import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VerifyPhoneDesktopComponent } from '../desktop/verify-phone.component';
import { VerifyPhoneMobileComponent } from '../mobile/verify-phone.component';

@Injectable({
  providedIn: 'root',
})
export class VerifyPhoneDialogService {
  _dialogRef: MatDialogRef<VerifyPhoneDesktopComponent>;
  _bottomSheetRef: MatBottomSheetRef<VerifyPhoneMobileComponent>;

  constructor(
    private _dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) {}

  showVerifyPhoneDialog() {
    if (window.innerWidth > 1000) {
      this._dialogRef = this._dialog.open(VerifyPhoneDesktopComponent, {
        width: '50%',
        autoFocus: false,
      });
    } else {
      this._bottomSheetRef = this._bottomSheet.open(VerifyPhoneMobileComponent);
    }
  }

  closeVerifyPhoneDialog() {
    if (this._dialogRef) {
      this._dialogRef.close();
    }

    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss();
    }
  }
}
