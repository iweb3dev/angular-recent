import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-limit-reached',
  templateUrl: './member-limit-reached.component.html',
  styleUrls: ['./member-limit-reached.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberLimitReachedComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public newPackageId: number,
    public _dialogRef: MatDialogRef<MemberLimitReachedComponent>,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  onCloseDialog(): void {
    this._router.navigate(['/billing', 'plan-upgrade', this.newPackageId], {
      relativeTo: this._route,
    });
  }
}
