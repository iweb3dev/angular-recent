import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-groups-dialog',
  templateUrl: './no-groups-dialog.component.html',
  styleUrls: ['./no-groups-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoGroupsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public _dialogRef: MatDialogRef<NoGroupsDialogComponent>,
    private _router: Router,
  ) {}

  onCloseDialog(): void {
    this._router.navigate(['/groups/create'], {
      queryParams: {
        from: 'new-communication',
      },
    });
  }
}
