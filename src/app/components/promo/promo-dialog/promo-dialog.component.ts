import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { PromoService } from '../promo.service';

@Component({
  selector: 'app-promo-dialog',
  templateUrl: './promo-dialog.component.html',
  styleUrls: ['./promo-dialog.component.scss'],
})
export class PromoDialogComponent implements OnInit {
  promoControl = new FormControl(null);

  constructor(private _dialogRef: MatDialogRef<PromoDialogComponent>) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onAdd(): void {
    this._dialogRef.close(this.promoControl.value);
  }
}
