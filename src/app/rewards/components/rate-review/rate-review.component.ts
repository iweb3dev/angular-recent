import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { RewardsService } from 'src/app/api/rewards/rewards.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import { fetchUserRewardsBalance } from '../../store/rewards.actionts';
import { RewardsState } from '../../store/rewards.store';

@Component({
  selector: 'app-rate-review',
  templateUrl: './rate-review.component.html',
  styleUrls: ['./rate-review.component.scss']
})
export class RateReviewComponent implements OnInit {
  private readonly MAX_NUMBER_OF_STARS = 5;
  private _destroy$ = new Subject<void>();
  public isLoading = false;

  @Input() rating = 0;
  emailMessageForm: FormGroup;
  numberOfFullStars: any = 0;
  numberOfEmptyStars: any = 5;
  constructor(
    private _formBuilder: FormBuilder,
    private _service: RewardsService,
    private _router: Router,
    private _toastService: ToastService,
    private _store: Store<RewardsState>,
    private _loaderService: LoaderService) {
    this.emailMessageForm = this._formBuilder.group({
      emailBody: [null, [Validators.required]],
    });
  }

  ngOnInit() {
  }

  onSubmitReview() {
    const formValue = this.emailMessageForm.value;
    const reviewText = formValue.emailBody;
    this._loaderService.showLoader();
    this.isLoading = true;
    this._service.submitUserRewardsReview(this.numberOfFullStars, reviewText)
    .pipe(
      takeUntil(this._destroy$),
      catchError((error) => {
        console.error(error);
        this._loaderService.removeLoader();
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
        return EMPTY;
      }))
    .subscribe((res: boolean) => {
      if (res) {
        setTimeout(() => {
          this._loaderService.removeLoader();
          this._toastService.addToast(ToastType.Success, 'Thank you for your feedback');
          this._store.dispatch(fetchUserRewardsBalance());
          this._router.navigateByUrl('/rewards');
        }, 3000);
      } else {
        this._loaderService.removeLoader();
        this._toastService.addToast(ToastType.Error, 'Something went wrong.');
      }
    });
  }

  onNavigateBack() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this._router.navigate(['./rewards']));
  }

  onUncheckRate(star) {
    this.numberOfFullStars = star;
    this.numberOfEmptyStars = this.MAX_NUMBER_OF_STARS - this.numberOfFullStars;
  }

  onCheckRate(star) {
    this.numberOfFullStars += star + 1;
    this.numberOfEmptyStars = this.MAX_NUMBER_OF_STARS - this.numberOfFullStars;
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }
}
