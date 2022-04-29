import { Component, Host, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public msg: string,
    public _snackBarRef: MatSnackBarRef<ToastComponent>,
  ) {}

  dismiss = () => this._snackBarRef.dismiss();
}
