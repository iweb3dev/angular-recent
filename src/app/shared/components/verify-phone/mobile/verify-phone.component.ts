import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-verify-phone-mobile',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss'],
})
export class VerifyPhoneMobileComponent implements OnInit {
  numberChosen = false;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<VerifyPhoneMobileComponent>,
  ) {}

  ngOnInit(): void {}

  onNumberChosen() {
    this.numberChosen = true;
  }

  onClose() {
    this._bottomSheetRef.dismiss();
  }
}
