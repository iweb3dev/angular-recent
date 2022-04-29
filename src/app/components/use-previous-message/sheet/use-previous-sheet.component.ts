import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';

import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

@Component({
  selector: 'app-use-previous-sheet',
  templateUrl: './use-previous-sheet.component.html',
  styleUrls: ['./use-previous-sheet.component.scss'],
})
export class UsePreviousSheetComponent implements OnInit {
  filterText: string;
  messageDetails$: Observable<MessagePagedObjectsDto[]>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public messages: MessagePagedObjectsDto[],
    private _bottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {}

  onAdd(message: MessagePagedObjectsDto): void {
    this._bottomSheetRef.dismiss(message.id);
  }
}
