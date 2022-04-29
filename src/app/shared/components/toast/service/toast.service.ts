import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast.component';
import { ValidatorToastComponent } from '../validator-toast/validator-toast.component';

export enum ToastType {
  Success,
  Error,
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  addToast(type: ToastType, msg: string): MatSnackBarRef<ToastComponent> {
    const classes = {
      [ToastType.Error]: 'error',
      [ToastType.Success]: 'success',
    };

    const toast = this._snackBar.openFromComponent(ToastComponent, {
      data: msg,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: classes[type],
      duration: 6000,
    });

    return toast;
  }

  createValidatorToast(
    message: string,
    title = 'Validation Error',
  ): MatSnackBarRef<ValidatorToastComponent> {
    return this._snackBar.openFromComponent(ValidatorToastComponent, {
      data: { message, title },
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: 'validator-notification',
    });
  }
}
