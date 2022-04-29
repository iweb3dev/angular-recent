import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MessageDetailsDesktopComponent } from '../desktop/message-details-desktop.component';
import { MessageDetailsMobileComponent } from '../mobile/message-details-mobile.component';

@Injectable({
  providedIn: 'root'
})
export class MessageDetailsService {
  _dialogRef: MatDialogRef<MessageDetailsDesktopComponent>;
  private _next$ = new Subject();
  private _dekstopViewRef: ViewContainerRef;
  _bottomSheetRef: MatBottomSheetRef<MessageDetailsMobileComponent>;
  showDesktopView$ = new Subject<boolean>();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private cfr: ComponentFactoryResolver
    ) {}

  open(desktopViewRef: ViewContainerRef) {
    if (window.innerWidth > 1000) {
      this.showDesktopView$.next(true);
      this._dekstopViewRef = desktopViewRef;
      desktopViewRef.clear();
      const componentFactory = this.cfr.resolveComponentFactory(MessageDetailsDesktopComponent);
      desktopViewRef.createComponent(componentFactory);
    } else {
      this._bottomSheetRef = this._bottomSheet.open(MessageDetailsMobileComponent, {
        data: {
          next: this._next$,
        }
      });
    }

    return this._next$.pipe(take(1), tap(() => this.close()));
  }

  close() {
    this.showDesktopView$.next(false);
    this._dekstopViewRef.clear();
    if (this._bottomSheetRef) {
      this._bottomSheetRef.dismiss();
    }
  }
}
