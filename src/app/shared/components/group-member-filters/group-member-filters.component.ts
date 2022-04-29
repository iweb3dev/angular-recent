import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-group-member-filters',
  templateUrl: './group-member-filters.component.html',
  styleUrls: ['./group-member-filters.component.scss'],
})
export class GroupMemberFiltersComponent {
  @Input() mobileView: boolean;
  @Input() filterValue: string;
  @Input() sortFilter: Array<{ key: string; value: string }>;

  @Input() areaCodeValue: string;

  @Output() closeModal: EventEmitter<void>;
  @Output() sortChanged: EventEmitter<string>;

  constructor() {
    this.closeModal = new EventEmitter<void>();
    this.sortChanged = new EventEmitter<string>();
  }

  closeFilterModal() {
    this.closeModal.emit();
  }

  sortFiltersOnChange(event: MatSelectChange) {
    this.sortChanged.emit(event.value);
  }
}
