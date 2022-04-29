import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

import {
  PackageChange,
  SuspensionReasons,
} from 'src/app/api/packages/packages.models';
import { PackageService } from 'src/app/api/packages/packages.service';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';

import { ReactivateScheduleDialogComponent } from './reactivate-schedule/dialog/reactivate-schedule-dialog.component';
import { ReactivateScheduleSheetComponent } from './reactivate-schedule/sheet/reactivate-schedule-sheet.component';

@Injectable()
export class PauseAccountService {
  constructor(
    private _matDialog: MatDialog,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    private _packageService: PackageService,
    private _matBottomSheet: MatBottomSheet,
    private _confirmDialogService: ConfirmDialogService,
  ) {}

  fetchSuspendReasons(): Observable<SuspensionReasons[]> {
    return this._packageService.getSuspensionReasons(true);
  }

  openReschedule({ isMobileView }): Observable<moment.Moment> {
    if (isMobileView) {
      return this._matBottomSheet
        .open(ReactivateScheduleSheetComponent, {})
        .afterDismissed();
    }

    return this._matDialog
      .open(ReactivateScheduleDialogComponent, {
        width: '416px',
        autoFocus: false,
      })
      .afterClosed();
  }

  confirmDeactivate(): Observable<boolean> {
    return this._confirmDialogService
      .showDialog({
        confirmBtn: 'Pause Account',
        header: 'Pause Account',
        detail: 'Are you sre you want to pause your account',
      })
      .pipe(filter((value) => !!value));
  }

  pauseAccount(payload: Partial<PackageChange>) {
    this._loaderService.showLoader();
    return this._packageService.updatePackage(payload).pipe(
      tap(() => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Account has been suspended.',
        );
      }),
      catchError((error) => {
        this._loaderService.removeLoader();
        console.error(error);

        this._toastService.addToast(ToastType.Error, 'Something went wrong.');

        return EMPTY;
      }),
    );
  }
}
