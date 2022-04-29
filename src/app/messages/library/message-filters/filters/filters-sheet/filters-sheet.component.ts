import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { MessageLibraryFiltersStateModel } from 'src/app/messages/messages.models';

import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

import { DateFilterEnum } from '../../message-filters.models';

@Component({
  selector: 'app-filters-sheet',
  templateUrl: './filters-sheet.component.html',
  styleUrls: ['./filters-sheet.component.scss'],
})
export class FiltersSheetComponent implements OnInit {
  readonly NotificationFormatValues = NotificationFormatValues;
  readonly sortOptions = [
    { option: DateFilterEnum.Asc, label: 'Old to New' },
    { option: DateFilterEnum.Desc, label: 'New to Old' },
  ];

  filtersForm: FormGroup;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    private _filters: MessageLibraryFiltersStateModel,
    private _formBuilder: FormBuilder,
    private _matBottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {
    this.filtersForm = this._formBuilder.group({
      dateFilter: [DateFilterEnum.Desc],
      hasVoiceMessage: [true],
      hasTextMessage: [true],
      hasEmailMessage: [true],
    });
    this.filtersForm.patchValue(this._filters);
  }

  onFiltersApply(): void {
    this._matBottomSheetRef.dismiss(this.filtersForm.value);
  }
}
