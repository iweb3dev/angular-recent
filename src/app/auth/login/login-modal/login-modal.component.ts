import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './login-modal.model';

@Component({
  selector: 'app-login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['login-modal.component.scss'],
})
export class LoginModalComponent {
  constructor(public dialogRef: MatDialogRef<LoginModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onMyPersonalAccount() {
    this.dialogRef.close(0);
  }

  onSharedAccount(index: number) {
    this.dialogRef.close(this.data.accounts[index].ownerID);
  }
}
