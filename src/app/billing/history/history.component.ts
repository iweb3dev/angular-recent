import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, take, takeUntil } from 'rxjs/operators';

import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

import { BillingFacade } from '../state/billing.facade';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  readonly PackageTypeIds = PackageTypeIds;

  userPackage$ = this._userFacade.userPackage$.pipe(
    filter((data) => !!data),
    map((data) => data.packageTypeId),
  );
  control = new FormControl(null);

  private _complete$ = new Subject<void>();
  constructor(
    private _billingFacade: BillingFacade,
    private _userFacade: UserFacade,
    private _route: ActivatedRoute,
    private _router: Router,
    private _historyService: HistoryService,
  ) {}

  get isCreditsHistoryView(): boolean {
    return this._router.url.includes('credits');
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(debounceTime(200), takeUntil(this._complete$))
      .subscribe((value) => {
        this._billingFacade.searchHistory(value);
      });
  }

  ngOnDestroy(): void {
    this._complete$.next();
    this._complete$.complete();
  }

  backToBilling(): void {
    this._router.navigate(['../', 'details'], {
      relativeTo: this._route,
    });
  }

  downloadAll(): void {
    this._historyService
      .downloadAll()
      .pipe(take(1))
      .subscribe((csvData) => {
        const encodedUri = encodeURI(csvData);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'purchase_history.csv');
        document.body.appendChild(link);

        link.click();
      });
  }
}
