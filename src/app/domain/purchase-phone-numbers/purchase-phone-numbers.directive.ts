import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  PaymentProfileBankAccount,
  PaymentProfileCreditCard,
} from '@api/financials/financials.models';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

import { PurchasePhoneNumbersService } from './purchase-phone-numbers.service';

@Directive({
  selector: '[appPurchasePhoneNumbers]',
})
export class PurchasePhoneNumbersDirective implements OnDestroy {
  private _tollFreeNumberSubscription: Subscription;

  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  existPhoneNumber: string;

  @Input()
  endDate: string;

  @Output()
  purchasedNumber = new EventEmitter<string>();

  @HostListener('click')
  openPurchasePhoneNumberConfigurator(): void {
    this._purchasePhoneNumbersService.showSpinner();

    this._tollFreeNumberSubscription =
      this.createTollFreeNumberPurchaseStream().subscribe(
        (number) => {
          this._purchasePhoneNumbersService.removeSpinner();
          if (!this.existPhoneNumber) {
            this._purchasePhoneNumbersService.openSuccessSnackbar(
              `Phone number has been successfully added.`,
            );
          } else {
            this._purchasePhoneNumbersService.openSuccessSnackbar(
              `Phone number has been successfully extended.`,
            );
          }

          this.purchasedNumber.emit(number);
        },
        (error) => {
          console.error(error);
          this._purchasePhoneNumbersService.removeSpinner();
          this._purchasePhoneNumbersService.openErrorSnackbar(
            'Something went wrong. Please, try again later.',
          );
        },
      );
  }

  constructor(
    private _purchasePhoneNumbersService: PurchasePhoneNumbersService,
  ) {}

  ngOnDestroy(): void {
    if (this._tollFreeNumberSubscription) {
      this._tollFreeNumberSubscription.unsubscribe();
    }
  }

  private createTollFreeNumberPurchaseStream(): Observable<string> {
    return this._purchasePhoneNumbersService
      .fetchPhoneConfiguratorData(this.userInfo.customerProfileID)
      .pipe(
        tap(() => this._purchasePhoneNumbersService.removeSpinner()),
        switchMap(
          (
            primaryProfiles: (PaymentProfileBankAccount &
              PaymentProfileCreditCard)[],
          ) =>
            this._purchasePhoneNumbersService
              .createConfigurator(primaryProfiles, this.existPhoneNumber, this.endDate)
              .pipe(
                tap(() => this._purchasePhoneNumbersService.showSpinner()),
                switchMap((purchaseData) =>
                  this._purchasePhoneNumbersService
                    .completePhonePurchase(purchaseData, this.userInfo)
                    .pipe(
                      catchError((error) => {
                        console.error(error);
                        this._purchasePhoneNumbersService.removeSpinner();
                        this._purchasePhoneNumbersService.openErrorSnackbar(
                          'Something went wrong. Please, try again later.',
                        );
                        return EMPTY;
                      }),
                    ),
                ),
              ),
        ),
      );
  }
}
