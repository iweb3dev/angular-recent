import { FormControl } from '@angular/forms';
import { Component, Inject } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { GroupNameMatDialogModel } from '../../models/group-name-mat-dialog.model';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-group-name-edit',
  templateUrl: './group-name-edit.component.html',
  styleUrls: ['./group-name-edit.component.scss'],
})
export class GroupNameEditComponent {
  public newGroupName: FormControl;

  constructor(
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _loaderService: LoaderService,
    public _dialogRef: MatDialogRef<GroupNameEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupNameMatDialogModel
  ) {
    this.newGroupName = new FormControl(this.data.groupName);
  }

  public saveOnClick(): void {
    this._loaderService.showLoader();
    this._groupService
      .updateGroupName(this.data.groupId, this.newGroupName.value)
      .pipe(
        take(1),
        catchError((response) => {
          this._loaderService.removeLoader();
          this._toastService.addToast(
            ToastType.Error,
            'An error occurred, unable to update group name'
          );
          return throwError(response);
        })
      )
      .subscribe((response) => {
        this._loaderService.removeLoader();
        this._toastService.addToast(
          ToastType.Success,
          'Group name changed sucessfully'
        );
        this._dialogRef.close(this.newGroupName.value);
      });
  }

  public cancelOnClick(): void {
    this._dialogRef.close(this.data.groupName);
  }
}
