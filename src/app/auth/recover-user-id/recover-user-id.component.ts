import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/api/users/users.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { RecoverUserIdService } from './recover-user-id.service';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { RequestGetUserNameByEmailAddress } from 'src/app/api/users/users.models';

@Component({
  selector: 'app-recover-user-id',
  templateUrl: './recover-user-id.component.html',
  styleUrls: ['./recover-user-id.component.scss']
})
export class RecoverUserIdComponent implements OnInit, OnDestroy {
  recoverForm: FormGroup;
  email: FormControl;
  private _destroy$ = new Subject<void>();
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private _service: RecoverUserIdService,
    private _loaderService: LoaderService,
    private _toastService: ToastService) {}

  ngOnInit() {
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]));

    this.recoverForm = this._formBuilder.group({
      email: this.email
    });
  }

  onSave() {
    if (this.recoverForm.invalid) {
      this.recoverForm.markAllAsTouched();
      return;
    }
    this._loaderService.showLoader();
    const formValue = this.recoverForm.value;
    const email = formValue.email;
    const dto: RequestGetUserNameByEmailAddress = {
      emailAddress: email
    };
    this._service.getUserNameByEmailAddress(dto)
    .pipe(
      takeUntil(this._destroy$),
      catchError((error) => {
        this._loaderService.removeLoader();
        console.error(error);
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
        return EMPTY;
      }),
    )
    .subscribe(res => {
      this._loaderService.removeLoader();
      if (res) {
        this._toastService.addToast(ToastType.Success, 'An email with your username is on the way.');
        this.navigateToLogin();
      } else {
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
      }
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
