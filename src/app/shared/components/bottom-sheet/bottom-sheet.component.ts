import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent {
  @Input()
  title: string;

  @Input()
  showAnotherComponent: boolean;

  @Output()
  closeAnotherComponent = new EventEmitter<void>();

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  onClose() {
    this._bottomSheetRef.dismiss();
  }
}
