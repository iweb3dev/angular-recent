import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/api/members/members.service';

@Component({
  selector: 'app-verifysubscribe',
  templateUrl: './verifysubscribe.component.html',
  styleUrls: ['./verifysubscribe.component.scss']
})
export class VerifysubscribeComponent implements OnInit, OnDestroy {
  public isSuccess = false;
  private _destroy$ = new Subject<void>();

  constructor(
    private _memberService: MemberService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
    .pipe(takeUntil(this._destroy$))
    .subscribe(params => {
      const args = params['args'];
      if (args) {
        this.verifySubscribedToCallingPostEmails(args);
      }
    });
  }

  verifySubscribedToCallingPostEmails(args: string) {
    this._memberService.verifySubscribedToCallingPostEmails(args)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res: boolean) => {
        this.isSuccess = res;
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
