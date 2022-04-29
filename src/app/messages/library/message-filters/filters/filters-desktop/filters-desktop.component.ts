import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MessageLibraryFiltersStateModel } from 'src/app/messages/messages.models';

import { NotificationFormatValues } from 'src/app/shared/models/message/message.models';

import {
  DateFilterEnum,
  MessageTypeFilterModel,
} from '../../message-filters.models';

@Component({
  selector: 'app-filters-desktop',
  templateUrl: './filters-desktop.component.html',
  styleUrls: ['./filters-desktop.component.scss'],
})
export class FiltersDesktopComponent implements OnInit {
  readonly NotificationFormatValues = NotificationFormatValues;
  readonly sortOptions = [
    { option: DateFilterEnum.Asc, label: 'Old to New' },
    { option: DateFilterEnum.Desc, label: 'New to Old' },
  ];

  filtersForm: FormGroup;

  @Output()
  dateFilterChange = new EventEmitter<DateFilterEnum>();

  @Output()
  messageTypeFilter = new EventEmitter<MessageTypeFilterModel>();

  @Input()
  set filters(filters: MessageLibraryFiltersStateModel) {
    this.filtersForm.patchValue(filters);
  }

  constructor(private _formBuilder: FormBuilder) {
    this.filtersForm = this._formBuilder.group({
      dateFilter: [DateFilterEnum.Desc],
      hasVoiceMessage: [true],
      hasTextMessage: [true],
      hasEmailMessage: [true],
    });
  }

  ngOnInit(): void {}

  onDateFilterChange({ value }: MatSelectChange): void {
    this.dateFilterChange.emit(value);
  }

  onMessageFormatChange(): void {
    const { value } = this.filtersForm;

    this.messageTypeFilter.emit({
      hasVoiceMessage: value.hasVoiceMessage,
      hasTextMessage: value.hasTextMessage,
      hasEmailMessage: value.hasEmailMessage,
    });
  }
}
