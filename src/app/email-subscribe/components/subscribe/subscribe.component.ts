import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, pipe } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/api/members/members.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {
  public emailForm: FormGroup;
  public isSuccess = false;
  public isSubmitted = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private _formBuilder: FormBuilder,
    private _memberService: MemberService) {}

  ngOnInit() {
    this.emailForm = this._formBuilder.group({
      email: ['', Validators.compose(
        [Validators.required, Validators.email])
      ]
    });
  }

  onSubmit() {
    const formValue = this.emailForm.value;
    const email = formValue.email;
    if (email) {
      this._memberService.subscribeToCallingPostEmails(email)
        .pipe(takeUntil(this._destroy$))
        .subscribe((res: boolean) => {
          if (res) {
            this.isSuccess = true;
            this.isSubmitted = true;
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
