import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PhoneNumbersFacade } from 'src/app/core/store/features/phone-numbers/phone-numbers.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { filter, map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import { PhoneNumbers } from '../../core/store/features/phone-numbers/phone-numbers.models';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';

@Component({
  selector: 'app-numbers-detail-container',
  templateUrl: './custom-numbers-detail.container.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomNumbersDetailContainerComponent implements OnInit {
  customerProfileId$ = this._userFacade.customerProfileId$;
  allPhoneNumbers$ = this._phoneNumbersFacade.allPhoneNumbers$;
  showDeleteSelection$ = this._phoneNumbersFacade.showDeleteSelection$;
  hasPhoneNumbers$ = this._phoneNumbersFacade.allPhoneNumbers$.pipe(
    map((s) => !!s.length),
  );
  userInfo$ = this._userFacade.currentUserInfo$;

  constructor(
    private _confirmDialogService: ConfirmDialogService,
    private _userFacade: UserFacade,
    private _phoneNumbersFacade: PhoneNumbersFacade,
    private _loaderFacade: LoaderFacade,
  ) {}

  ngOnInit(): void {}

  onSelectedAllPhoneNumbersForDelete(shouldSelect: {
    shouldSelect: boolean;
  }): void {
    this._phoneNumbersFacade.selectAllPhoneNumbersForDelete(shouldSelect);
  }

  onShowDeleteSelection(): void {
    this._phoneNumbersFacade.showDeleteSelection();
  }

  onHideDeleteSelection(): void {
    this._phoneNumbersFacade.hideDeleteSelection();
  }

  onDeletePhoneNumbers(deleteData: {
    id: number;
    shouldDelete: boolean;
  }): void {
    const phoneNumbersUpdate: Update<PhoneNumbers> = {
      id: deleteData.id,
      changes: {
        flaggedForDeletion: deleteData.shouldDelete,
      },
    };
    this._phoneNumbersFacade.setPurchaseNumberForDelete(phoneNumbersUpdate);
  }

  onDeleteSelectedPhoneNumbers(): void {
    this._phoneNumbersFacade.deleteSelectedPhoneNumbers();
  }

  onDeleteAllPhoneNumbers(): void {
    this._loaderFacade.showLoader();
    this._phoneNumbersFacade.deleteAllPhoneNumbers();
  }

  onDeleteSinglePhoneNumber(event): void {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Phone Number',
        detail: 'Are you sre you want to delete this Phone Number?',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this._loaderFacade.showLoader();
        this._phoneNumbersFacade.deleteSinglePhoneNumber(event.id);
      });
  }
}
