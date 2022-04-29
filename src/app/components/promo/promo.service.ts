import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { PromoCode } from 'src/app/api/financials/financials.models';

import { PromoCodesService } from 'src/app/api/promocodes/promocodes.service';
import { PromoDialogComponent } from './promo-dialog/promo-dialog.component';

@Injectable()
export class PromoService {
  constructor(
    private _matDialog: MatDialog,
    private _promoCodesService: PromoCodesService,
  ) {}

  openPromoDialog(): Observable<PromoCode> {
    return this.createDialog().pipe(
      filter((value) => !!value),
      switchMap((value) =>
        this._promoCodesService.validatePromoCode({ promoCode: value }),
      ),
      catchError(() => of({} as PromoCode)),
    );
  }

  private createDialog(): Observable<string> {
    return this._matDialog
      .open(PromoDialogComponent, { width: '400px' })
      .afterClosed();
  }
}
