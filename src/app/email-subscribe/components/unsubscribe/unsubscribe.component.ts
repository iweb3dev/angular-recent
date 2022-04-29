import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/api/members/members.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.scss']
})
export class UnsubscribeComponent implements OnInit, OnDestroy {
  public isSuccess = false;
  public isSubmitted = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private _memberService: MemberService,
    private route: ActivatedRoute) {}

  ngOnInit() {
  }

  unsubscribeFromEmails() {
    this.route.queryParams
    .pipe(takeUntil(this._destroy$))
    .subscribe(params => {
      const message = params['args'];
      if (message) {
        this.unsubscribe(message);
      }
    });
  }

  unsubscribe(args) {
    this._memberService.unsubscribeToAllCallingPostEmails(args)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res: boolean) => {
        if (res) {
          this.isSuccess = true;
          this.isSubmitted = true;
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
