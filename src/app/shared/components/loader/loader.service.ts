import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { hasValue } from '../../utils/verifications/value-check';

import { LoaderComponent } from './loader.component';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _overlayRef: OverlayRef;

  constructor(private _overlay: Overlay) {}

  get hasLoaderAttached(): boolean {
    return hasValue(this._overlayRef);
  }

  showLoader(): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      backdropClass: 'loader',
    });
    this._overlayRef.attach(new ComponentPortal(LoaderComponent));
  }

  removeLoader(): void {
    this._overlayRef.detach();
    this._overlayRef = null;
  }

  removeAttachedLoader(): void {
    if (this.hasLoaderAttached) {
      this.removeLoader();
    }
  }

  showDetachedLoader(): void {
    if (!this.hasLoaderAttached) {
      this.showLoader();
    }
  }
}
