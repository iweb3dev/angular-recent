import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-validator-toast',
  templateUrl: './validator-toast.component.html',
  styleUrls: ['./validator-toast.component.scss'],
})
export class ValidatorToastComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; title: string },
    public _snackBarRef: MatSnackBarRef<ValidatorToastComponent>,
  ) {}

  ngOnInit(): void {}

  onCloseSnackbar(): void {
    this._snackBarRef.dismiss();
  }
}
