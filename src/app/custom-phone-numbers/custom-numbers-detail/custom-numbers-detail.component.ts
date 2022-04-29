import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { PhoneNumbers } from 'src/app/core/store/features/phone-numbers/phone-numbers.models';
import { PhoneNumbersFacade } from 'src/app/core/store/features/phone-numbers/phone-numbers.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

@Component({
  selector: 'app-custom-numbers-detail',
  templateUrl: './custom-numbers-detail.component.html',
  styleUrls: ['./custom-numbers-detail.component.scss'],
})
export class CustomNumbersDetailComponent implements OnInit {
  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  phoneNumbers$: Observable<PhoneNumbers[]>;

  @Input()
  hasPhoneNumber: boolean;

  @Input()
  isDeleteSelection$: Observable<boolean>;

  @Output()
  selectAllPhoneNumbers = new EventEmitter<{ shouldSelect: boolean }>();

  @Output()
  showDeleteSelection = new EventEmitter<void>();

  @Output()
  hideDeleteSelection = new EventEmitter<void>();

  @Output()
  deletePhoneNumber = new EventEmitter<{ id: number; shouldDelete: boolean }>();

  @Output()
  deleteSelectedPhoneNumbers = new EventEmitter<void>();

  @Output()
  deleteAllPhoneNumbers = new EventEmitter<void>();

  @Output()
  deleteSinglePhoneNumber = new EventEmitter<{ id: number }>();

  constructor(private _phoneNumbersFacade: PhoneNumbersFacade) {}

  ngOnInit(): void {}

  onReceivePhoneNumber(): void {
    this._phoneNumbersFacade.fetchPhoneNumbers();
  }

  onSelectedPhoneNumbers(shouldSelect: { shouldSelect: boolean }) {
    this.selectAllPhoneNumbers.emit(shouldSelect);
  }

  onShowDeleteSelection(): void {
    this.showDeleteSelection.emit();
  }

  onHideDeleteSelection(): void {
    this.hideDeleteSelection.emit();
  }

  onDeletePhoneNumber(deleteData: { id: number; shouldDelete: boolean }): void {
    this.deletePhoneNumber.emit(deleteData);
  }

  onDeleteAllSelectedPhoneNumbers(): void {
    this.deleteSelectedPhoneNumbers.emit();
  }

  onDeletePhoneNumbers(): void {
    this.deleteAllPhoneNumbers.emit();
  }

  onDeleteSinglePhoneNumber(event): void {
    this.deleteSinglePhoneNumber.emit({ id: event.id });
  }
}
