import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.scss']
})
export class ReferComponent implements OnInit {
  emailMessageForm: FormGroup;
  private _destroy$ = new Subject<void>();
  constructor(
    private _formBuilder: FormBuilder,
    private _service: RewardsService,
    private _router: Router,
    private _toastService: ToastService) {
    this.emailMessageForm = this._formBuilder.group({
      emailBody: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSendReferralEmail() {
    const formValue = this.emailMessageForm.value;
    const allemails: string = formValue.emailBody;
    if (!allemails) {
      return;
    }
    const emails: string[] = allemails.split(',');
    if (emails.length > 10) {
      this._toastService.addToast(ToastType.Error, 'Enter up to 10 emails and separate them with commas.');
      return;
    }
    this._service.submitRewardsReferralEmails(emails)
    .pipe(
      takeUntil(this._destroy$),
      catchError((error) => {
        console.error(error);
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
        return EMPTY;
      }))
    .subscribe((res: boolean) => {
      if (res) {
        this._toastService.addToast(ToastType.Success, 'Thank you for referring');
        this._router.navigateByUrl('/rewards');
      } else {
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
      }
    });
  }

  onNavigateBack() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate(['./rewards']));
  }
}
