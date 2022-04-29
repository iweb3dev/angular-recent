import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { KeywordMember, KeywordMembers } from '../api/sms/sms.models';

import { SmsService } from '../api/sms/sms.service';
import {
  ToastType,
  ToastService,
} from '@shared/components/toast/service/toast.service';

@Component({
  selector: 'app-keyword-member-information',
  templateUrl: './keyword-member-information.component.html',
  styleUrls: ['./keyword-member-information.component.scss'],
})
export class KeywordMemberInformationComponent implements OnInit, OnDestroy {
  public groupForm: FormGroup;
  public groupDetails: KeywordMembers;

  public isSuccess = false;
  public isSubmitted = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private _renderer: Renderer2,
    private _route: ActivatedRoute,
    private _smsService: SmsService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    _renderer.setStyle(_document.body, 'background-color', '#f8f8f8');
  }

  ngOnInit(): void {
    this._route.queryParams
      .pipe(takeUntil(this._destroy$))
      .subscribe((params) => {
        const member = params['args'];
        if (member) {
          this.getCommunicationEndPointResponseArgs(member);
        }
      });

    this.groupForm = this._formBuilder.group({
      lastName: [''],
      firstName: [''],
      email: ['', Validators.email],
    });
  }

  getCommunicationEndPointResponseArgs(memberString: string): void {
    this._smsService
      .getCommunicationEndPointResponseArgs(memberString)
      .pipe(
        takeUntil(this._destroy$),
        filter((res) => !!res)
      )
      .subscribe((res: KeywordMembers) => (this.groupDetails = res));
  }

  isFormEmpty(form: {
    firstName: string;
    lastName: string;
    email: string;
  }): boolean {
    return !form.firstName && !form.lastName && !form.email;
  }

  onSubmit(): void {
    const formValue = this.groupForm.value;

    if (this.groupForm.invalid || !this.groupDetails) {
      return;
    }

    if (this.isFormEmpty(formValue)) {
      this._toastService.addToast(
        ToastType.Error,
        'Please fill atleast one field'
      );
      return;
    }

    const memberData: KeywordMember = {
      ...this.groupDetails.member,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      emailAddress: formValue.email,
    };

    this._smsService
      .saveMemberResponse(
        this.groupDetails.member.groupID,
        this.groupDetails.member.id,
        memberData
      )
      .pipe(takeUntil(this._destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          this.isSuccess = res;
          this.isSubmitted = true;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._renderer.removeStyle(this._document.body, 'background-color');
  }
}
