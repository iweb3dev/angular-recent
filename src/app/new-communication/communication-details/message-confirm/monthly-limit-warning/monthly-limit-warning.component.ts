import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-monthly-limit-warning',
  templateUrl: './monthly-limit-warning.component.html',
  styleUrls: ['./monthly-limit-warning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyLimitWarningComponent implements OnInit {
  constructor(
    public _dialogRef: MatDialogRef<MonthlyLimitWarningComponent>,
  ) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._dialogRef.close();
  }

}
