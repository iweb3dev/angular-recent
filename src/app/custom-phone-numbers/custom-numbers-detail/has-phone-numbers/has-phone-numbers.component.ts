import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { PhoneNumbers } from 'src/app/core/store/features/phone-numbers/phone-numbers.models';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { filter } from 'rxjs/operators';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

@Component({
  selector: 'app-has-phone-numbers',
  templateUrl: './has-phone-numbers.component.html',
  styleUrls: ['./has-phone-numbers.component.scss'],
})
export class HasPhoneNumbersComponent implements OnInit, OnDestroy {
  private _isMobileView: boolean;

  @Input()
  allPhoneNumbers$: Observable<PhoneNumbers[]>;

  @Input()
  deleteSelection$: Observable<boolean>;

  @Input()
  userInfo: MainUserInfoModel;

  @Output()
  receivePurchasedNumber = new EventEmitter<string>();

  @Output()
  selectedPhoneNumbers = new EventEmitter<{ shouldSelect: boolean }>();

  @Output()
  showDeleteSelection = new EventEmitter<void>();

  @Output()
  hideDeleteSelection = new EventEmitter<void>();

  @Output()
  deletePhoneNumberData = new EventEmitter<{
    id: number;
    shouldDelete: boolean;
  }>();

  @Output()
  deleteAllSelectedPhoneNumbers = new EventEmitter<void>();

  @Output()
  deletePhoneNumbers = new EventEmitter<void>();

  @Output()
  deleteSinglePN = new EventEmitter<{ id: number }>();

  allSelected = false;
  canEnableDelete = false;

  private subscription = new Subscription();

  constructor(
    private _confirmDialogService: ConfirmDialogService,
    private _loaderFacade: LoaderFacade,
  ) {
    this._isMobileView = window.innerWidth <= 600;
  }

  get isMobileView(): boolean {
    return this._isMobileView;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.allPhoneNumbers$.subscribe((phoneNumbers) => {
        this.canEnableDelete = phoneNumbers.some(
          (phoneNumber) => phoneNumber.flaggedForDeletion,
        );
        this.allSelected = phoneNumbers.every(
          (phoneNumber) => phoneNumber.flaggedForDeletion,
        );
      }),
    );
  }

  onSelectAllPhoneNumbersForDelete(allSelected: boolean): void {
    this.selectedPhoneNumbers.emit({ shouldSelect: allSelected });
  }

  onShowDeleteSelection(): void {
    this.showDeleteSelection.emit();
  }

  onPhoneNumbersDeleteSelectionHide(): void {
    this.hideDeleteSelection.emit();
  }

  onDeletePhoneNumbers(deleteData: {
    id: number;
    shouldDelete: boolean;
  }): void {
    this.deletePhoneNumberData.emit(deleteData);
  }

  onPhoneNumbersDelete() {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Phone Numbers',
        detail: 'Are you sre you want to delete selected Phone Numbers?',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this._loaderFacade.showLoader();
        this.deleteAllSelectedPhoneNumbers.emit();
      });
  }

  onDeleteAllPhoneNumbers(): void {
    this.deletePhoneNumbers.emit();
  }

  onDeleteSinglePN(event): void {
    this.deleteSinglePN.emit({ id: event.id });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
