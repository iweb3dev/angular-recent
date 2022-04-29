import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';

import { MessageLibraryFiltersStateModel } from '../../messages.models';
import { FiltersSheetComponent } from './filters/filters-sheet/filters-sheet.component';

@Injectable()
export class MessageFiltersService {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openMobileFilters(filters: MessageLibraryFiltersStateModel): Observable<any> {
    return this._bottomSheet
      .open(FiltersSheetComponent, { data: filters })
      .afterDismissed();
  }
}
