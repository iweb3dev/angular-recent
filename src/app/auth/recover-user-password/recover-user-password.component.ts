import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { PasswordResetResult } from 'src/app/api/shared/shared.enums';
import { RequestResetPassword } from 'src/app/api/users/users.models';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { RecoverUserPasswordService } from './recover-user-password.service';

@Component({
  selector: 'app-recover-user-password',
  templateUrl: './recover-user-password.component.html',
  styleUrls: ['./recover-user-password.component.scss']
})
export class RecoverUserPasswordComponent implements OnInit {
  recoverForm: FormGroup;
  userId: FormControl;
  private _destroy$ = new Subject<void>();
  private readonly productAPIKey = '03d3b201-f475-4a74-892a-690821da51f4';
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
    private _service: RecoverUserPasswordService) {}

  ngOnInit() {
    this.userId = new FormControl('', Validators.compose([
      Validators.required
    ]));

    this.recoverForm = this._formBuilder.group({
      userId: this.userId
    });
  }

  onSave() {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }
    this._loaderService.showLoader();
    const formValue = this.recoverForm.value;
    const userId = formValue.userId;
    const dto: RequestResetPassword = {
      userName: userId,
      productAPIKey: this.productAPIKey,
    };
    this._service.resetUserPassword(dto)
    .pipe(
      takeUntil(this._destroy$),
      catchError((error) => {
        this._loaderService.removeLoader();
        console.error(error);
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
        return EMPTY;
      }),
    )
    .subscribe((res: PasswordResetResult) => {
      this._loaderService.removeLoader();
      if (res === PasswordResetResult.email) {
        this._toastService.addToast(ToastType.Success, 'A Password reset email is on the way.');
        this.navigateToLogin();
      } else {
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
      }
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('');
  }

}
