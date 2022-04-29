import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import {
  filter,
  map,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

import { SuspensionReasons } from 'src/app/api/packages/packages.models';
import { SubscriptionChangeTypes } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

import { PauseAccountService } from './pause-account.service';

@Component({
  selector: 'app-pause-account',
  templateUrl: './pause-account.component.html',
  styleUrls: ['./pause-account.component.scss'],
})
export class PauseAccountComponent implements OnInit, OnDestroy {
  suspensionReasonControl = new FormControl(null, [Validators.required]);
  scheduleReactivation = new FormControl(false);
  reactivationDate = new Date();

  reasons$: Observable<SuspensionReasons[]>;
  isSuspendedOnNextCharge$ = this._userFacade.currentUserInfo$.pipe(
    map((user) => user.userSubscription.isSuspendedOnNextChargeDate),
  );

  private _destroy$ = new Subject<void>();
  constructor(
    private _router: Router,
    private _userFacade: UserFacade,
    private _activatedRoute: ActivatedRoute,
    private _pauseAccountService: PauseAccountService,
  ) {}

  ngOnInit(): void {
    this.reasons$ = this._pauseAccountService.fetchSuspendReasons();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  backToBillingDetails(): void {
    this._router.navigate(['../details'], {
      relativeTo: this._activatedRoute,
    });
  }

  onShowDatePicker(): void {
    this._pauseAccountService
      .openReschedule({ isMobileView: window.innerWidth <= 599 })
      .pipe(
        takeUntil(this._destroy$),
        filter((value) => !!value),
      )
      .subscribe((value) => (this.reactivationDate = value.toDate()));
  }

  onAccountDeactivate(): void {
    this._pauseAccountService
      .confirmDeactivate()
      .pipe(
        takeUntil(this._destroy$),
        withLatestFrom(this._userFacade.userPackage$),
        switchMap(([_, currentPackage]) =>
          this._pauseAccountService.pauseAccount({
            suspendReason: this.suspensionReasonControl.value.id,
            subscriptionChangeType: SubscriptionChangeTypes.suspend,
            currentPackageId: currentPackage.id,
          }),
        ),
      )
      .subscribe(() => {
        this._userFacade.fetchUser();
        this._router.navigate(['../details'], {
          relativeTo: this._activatedRoute,
        });
      });
  }
}
