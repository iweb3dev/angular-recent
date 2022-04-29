import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberLimitReachedComponent } from '../member-limit-reached/member-limit-reached.component';

@Component({
  selector: 'app-no-credit-dialog',
  templateUrl: './no-credit-dialog.component.html',
  styleUrls: ['./no-credit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCreditDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public newPackageId: number,
    public _dialogRef: MatDialogRef<MemberLimitReachedComponent>,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {
  }

  onCloseDialog(): void {
    this._router.navigate(['/billing', 'plan-upgrade', this.newPackageId], {
      relativeTo: this._route,
    });
  }

}
