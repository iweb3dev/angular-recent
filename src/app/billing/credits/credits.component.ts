import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditsTracker } from '@core/services/purchase-revenue-service/purchase-revenue.models';
import { PurchaseRevenueService } from '@core/services/purchase-revenue-service/purchase-revenue.service';
import { combineLatest, EMPTY, forkJoin, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { OrderReceipt, UpgradePackageDtoModel } from 'src/app/api/packages/packages.models';
import { PayPalBuyCreditsResponseModel } from 'src/app/api/paypal/paypal.models';
import { PackageTypeIds, PaymentPrograms } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

import { CreditsService } from './credits.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
})
export class CreditsComponent implements OnInit, OnDestroy, AfterViewInit {
  creditControl = new FormControl(null);

  additionalCredits$: Observable<AdditionalCredit[]>;
  userCredits$: Observable<number>;
  packageType$: Observable<number>;

  private _purchaseCreditsSubject$ = new Subject<AdditionalCredit>();
  private _addCreditsSubscription: Subscription;
  private _currentUserInfoSubscription: Subscription;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userFacade: UserFacade,
    private _creditsService: CreditsService,
    private _purchaseRevenueService: PurchaseRevenueService
  ) {}

  @ViewChild('topScrollAnchor') topScroll: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this._userFacade.currentUserInfo$
      .pipe(take(1))
      .pipe(map((info) => info.package.version))
      .subscribe((packageType) => {
        this.additionalCredits$ = this._creditsService
          .fetchAdditionalCredits(packageType)
          .pipe(tap(([credit]) => this.creditControl.setValue(credit)));
      });

    this.userCredits$ = this._userFacade.currentUserInfo$.pipe(take(1)).pipe(map((info) => info.userCredits));

    this._addCreditsSubscription = this.createPurchaseCreditsStream().subscribe(() => {
      this._userFacade.fetchUser();
      this._creditsService.removeLoader();
      this._router.navigate(['/dashboard'], {
        relativeTo: this._route,
      });
      this._creditsService.addSuccessToast('Credits have been successfully added.');
    });
  }

  ngAfterViewInit(): void {
    this.topScroll.nativeElement.scrollIntoView(true);
  }

  ngOnDestroy(): void {
    if (this._addCreditsSubscription) {
      this._addCreditsSubscription.unsubscribe();
    }

    if (this._currentUserInfoSubscription) {
      this._currentUserInfoSubscription.unsubscribe();
    }

    this._purchaseCreditsSubject$.complete();
  }

  goPremium(): void {
    this._router.navigate(['../', 'plan-details'], {
      relativeTo: this._route,
    });
  }

  onCreditsSelect(): void {
    this._purchaseCreditsSubject$.next(this.creditControl.value);
  }

  private createPurchaseCreditsStream(): Observable<PayPalBuyCreditsResponseModel | [OrderReceipt, UpgradePackageDtoModel]> {
    return combineLatest([this._purchaseCreditsSubject$, this._userFacade.currentUserInfo$.pipe(take(1))]).pipe(
      tap(() => this._creditsService.addLoader()),
      switchMap(([additionalCredit, userInfo]) =>
        this._creditsService.fetchPurchaseCreditsData(userInfo).pipe(
          tap(() => this._creditsService.removeLoader()),
          switchMap(([primaryPaymentProfile, rewardsBalance]) =>
            this._creditsService.openPurchaseCreditsWindow(additionalCredit, primaryPaymentProfile, rewardsBalance).pipe(
              tap(() => this._creditsService.addLoader()),
              switchMap((creditsDialogDataModel) => {
                const payPalSelected = creditsDialogDataModel.paymentData?.selectedPaymentProgram === PaymentPrograms.payPal;

                if (payPalSelected) {
                  return this._creditsService.createPayPalCreditsTransaction(
                    creditsDialogDataModel.payPalData,
                    creditsDialogDataModel.promocode,
                    additionalCredit,
                    userInfo,
                    rewardsBalance
                  );
                }

                return this._creditsService
                  .createCreditsRequestPayload(
                    creditsDialogDataModel,
                    userInfo,
                    additionalCredit,
                    rewardsBalance,
                    creditsDialogDataModel.selectedPaymentProfile
                  )
                  .pipe(
                    switchMap((purchaseCreditsPayload) =>
                      forkJoin([
                        this._creditsService.submitCreditsUpdate(purchaseCreditsPayload).pipe(
                          tap((creditsResult) => {
                            const packageTracker: CreditsTracker = {
                              amountPaid: creditsResult.amountPaid,
                              transactionNumber: creditsResult.transactionNumber,
                              creditCount: purchaseCreditsPayload.creditUpgradeModel.creditAmount,
                            };
                            this._purchaseRevenueService.sendCreditsPurchaseRevenueEvent(packageTracker);
                          })
                        ),
                        userInfo.package.packageTypeId === PackageTypeIds.PayAsYouGo ||
                          userInfo.package.packageTypeId === PackageTypeIds.MonthlyCredits
                          ? of(null)
                          : this._creditsService.downgradePackage(purchaseCreditsPayload, userInfo),
                      ]).pipe(
                        catchError(() => {
                          this._creditsService.removeLoader();
                          this._creditsService.addErrorToast('Something went wrong.');

                          return EMPTY;
                        })
                      )
                    )
                  );
              })
            )
          )
        )
      )
    );
  }
}
