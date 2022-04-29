import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verify-phone-desktop',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneDesktopComponent implements OnInit {
  numberChosen = false;

  constructor(private _dialog: MatDialogRef<VerifyPhoneDesktopComponent>) {}

  ngOnInit(): void {
  }

  onNumberChosen() {
    this.numberChosen = true;
  }

  onClose() {
    this._dialog.close();
  }
}
