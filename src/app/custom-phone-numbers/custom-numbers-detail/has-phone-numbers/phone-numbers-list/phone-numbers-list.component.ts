import {
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PhoneNumbers } from 'src/app/core/store/features/phone-numbers/phone-numbers.models';
import { Observable, Subscription } from 'rxjs';
import { PhoneNumbersService } from 'src/app/api/phone-numbers/phone-numbers.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { PhoneNumbersFacade } from 'src/app/core/store/features/phone-numbers/phone-numbers.facade';
import { MatDialog } from '@angular/material/dialog';
import { CallDialogComponent } from './call-dialog/call-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CallSheetComponent } from './call-sheet/call-sheet.component';
import { filter } from 'rxjs/operators';
import { MainUserInfoModel } from '@core/store/features/user/user.model';

@Component({
  selector: 'app-phone-numbers-list',
  templateUrl: './phone-numbers-list.component.html',
  styleUrls: ['./phone-numbers-list.component.scss'],
})
export class PhoneNumbersListComponent implements OnInit, OnDestroy {
  @Input()
  phoneNumbers$: Observable<PhoneNumbers[]>;

  @Input() showDeleteSelection$: Observable<boolean>;

  @Input() userInfo: MainUserInfoModel;

  @Output()
  deletePhoneNumber = new EventEmitter<{
    id: number;
    shouldDelete: boolean;
  }>();

  @Output()
  deleteSinglePhoneNumber = new EventEmitter<{ id: number }>();

  displayedColumns: string[];

  private subscription = new Subscription();

  constructor(
    private _phoneNumbersService: PhoneNumbersService,
    private _toastService: ToastService,
    private _phoneNumbersFacade: PhoneNumbersFacade,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.showDeleteSelection$.subscribe((showDeleteSelection: boolean) => {
        if (showDeleteSelection) {
          this.displayedColumns = [
            'select',
            'phoneNumber',
            'callForwardPhoneNumber',
            'renewalDate',
            'extendRenewal',
            'actions',
          ];
        } else {
          this.displayedColumns = [
            'phoneNumber',
            'callForwardPhoneNumber',
            'renewalDate',
            'extendRenewal',
            'actions',
          ];
        }
      }),
    );
  }

  onPhoneNumbersDeleteClick(id: number, event: MatCheckboxChange): void {
    this.deletePhoneNumber.emit({
      id: id,
      shouldDelete: event.checked,
    });
  }

  onDelete(id: number) {
    this.deleteSinglePhoneNumber.emit({ id: id });
  }

  onCallForwardingDialogOrSheet(phoneNumber: string) {
    if (!this._isMobileView) {
      return this.openTextCustomPhoneSelectorDialog(phoneNumber);
    } else {
      return this.openTextCustomPhoneSelectorSheet(phoneNumber);
    }
  }

  openDialog(
    phoneNumber: string,
    isEditMode: boolean,
    boughtPhoneNumberId?: number | undefined,
    phoneNumberToForwardTo?: string | null,
  ) {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      height: '400px',
      width: '600px',
      panelClass: 'call-forward-dialog',
      data: {
        phoneNumber: phoneNumber,
        isEditMode: isEditMode,
        boughtPhoneNumberId: boughtPhoneNumberId,
        phoneNumberToForwardTo: phoneNumberToForwardTo,
      },
    });
    return dialogRef.afterClosed().pipe(filter((value) => !!value));
  }

  openSheet(
    phoneNumber: string,
    isEditMode: boolean,
    boughtPhoneNumberId?: number | undefined,
    phoneNumberToForwardTo?: string | null,
  ): Observable<any> {
    return this._bottomSheet
      .open(CallSheetComponent, {
        backdropClass: 'bottom-sheet-backdrop',
        panelClass: 'bottom-sheet-container',
        data: {
          phoneNumber: phoneNumber,
          isEditMode: isEditMode,
          boughtPhoneNumberId: boughtPhoneNumberId,
          phoneNumberToForwardTo: phoneNumberToForwardTo,
        },
      })
      .afterDismissed();
  }

  private openTextCustomPhoneSelectorDialog(phoneNumber: string) {
    this.subscription.add(
      this._phoneNumbersService
        .getPhoneNumberCallForward(phoneNumber)
        .subscribe((resp: any) => {
          let isEditMode;
          if (!resp) {
            isEditMode = false;
            this.openDialog(phoneNumber, isEditMode).subscribe((response) => {
              if (response.isSaved) {
                this._phoneNumbersFacade.fetchPhoneNumbers();
                this._toastService.addToast(
                  ToastType.Success,
                  'Call Forwarding Added Successfully.',
                );
              } else {
                this._toastService.addToast(
                  ToastType.Error,
                  'Call Forwarding Not Added Successfully.',
                );
              }
            });
          } else {
            isEditMode = true;
            this.openDialog(
              phoneNumber,
              isEditMode,
              resp?.mfA_PhoneNumberID,
              resp?.phoneNumberToForwardTo,
            ).subscribe((response) => {
              if (response.isSaved) {
                this._phoneNumbersFacade.fetchPhoneNumbers();
                this._toastService.addToast(
                  ToastType.Success,
                  'Call Forwarding Updated Successfully.',
                );
              } else {
                this._toastService.addToast(
                  ToastType.Error,
                  'Call Forwarding Not Updated Successfully.',
                );
              }
            });
          }
        }),
    );
  }

  private openTextCustomPhoneSelectorSheet(phoneNumber: string) {
    this.subscription.add(
      this._phoneNumbersService
        .getPhoneNumberCallForward(phoneNumber)
        .subscribe((resp: any) => {
          let isEditMode;
          if (!resp) {
            isEditMode = false;
            this.openSheet(phoneNumber, isEditMode).subscribe((response) => {
              if (response.isSaved) {
                this._phoneNumbersFacade.fetchPhoneNumbers();
                this._toastService.addToast(
                  ToastType.Success,
                  'Call Forwarding Added Successfully.',
                );
              } else {
                this._toastService.addToast(
                  ToastType.Error,
                  'Call Forwarding Not Added Successfully.',
                );
              }
            });
          } else {
            isEditMode = true;
            this.openSheet(
              phoneNumber,
              isEditMode,
              resp?.mfA_PhoneNumberID,
              resp?.phoneNumberToForwardTo,
            ).subscribe((response) => {
              if (response.isSaved) {
                this._phoneNumbersFacade.fetchPhoneNumbers();
                this._toastService.addToast(
                  ToastType.Success,
                  'Call Forwarding Updated Successfully.',
                );
              } else {
                this._toastService.addToast(
                  ToastType.Error,
                  'Call Forwarding Not Updated Successfully.',
                );
              }
            });
          }
        }),
    );
  }

  private get _isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
