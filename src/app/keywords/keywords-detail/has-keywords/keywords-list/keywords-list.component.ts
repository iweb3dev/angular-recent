import { ActivatedRoute, Router } from '@angular/router';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Input,
  NgZone,
  OnInit,
  Output,
  Component,
  ViewChild,
  OnDestroy,
  EventEmitter,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { filter, map, pairwise, take } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Keyword } from 'src/app/core/store/features/keywords/keywords.models';

@Component({
  selector: 'app-keywords-list',
  templateUrl: './keywords-list.component.html',
  styleUrls: ['./keywords-list.component.scss'],
})
export class KeywordsListComponent implements OnInit, OnDestroy {
  @ViewChild('scroller', { static: false }) scroller: CdkVirtualScrollViewport;

  @Input() showDeleteSelection: boolean;

  @Input() keywords: Keyword[];

  subscription$ = new Subscription();

  @Output()
  deleteKeyword = new EventEmitter<{
    keyword: string;
    shouldDelete: boolean;
  }>();

  constructor(
    private _ngZone: NgZone,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setScrollerOnChange();
  }

  onKeywordDeleteClick(keyword: string, event: MatCheckboxChange): void {
    this.deleteKeyword.emit({
      keyword: keyword,
      shouldDelete: event.checked,
    });
  }

  private setScrollerOnChange(): void {
    fromEvent(window, 'wheel')
      .pipe(
        filter(() => !!this.scroller),
        take(1)
      )
      .subscribe(() => this.setBottomScroller());
  }

  private setBottomScroller(): void {
    this.subscription$.add(
      this.scroller
        .elementScrolled()
        .pipe(
          map(() => this.scroller.measureScrollOffset('bottom')),
          pairwise()
        )
        .subscribe(() => {
          this._ngZone.run(() => {});
        })
    );
  }

  updateRenewalOnClick(keyword: string): void {
    const detailedKeyword = this.keywords
      .find(kw => kw.keyword === keyword);
    this._router.navigate(['renew', keyword], {
      relativeTo: this._activatedRoute,
      queryParams: { endDate: detailedKeyword.endDate }
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
