import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyword } from 'src/app/core/store/features/keywords/keywords.models';
import { Subscription } from 'rxjs';
import { Update } from '@ngrx/entity';
import { filter } from 'rxjs/operators';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/services/confirm-dialog.service';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';

@Component({
  selector: 'app-has-keywords',
  templateUrl: './has-keywords.component.html',
  styleUrls: ['./has-keywords.component.scss'],
})
export class HasKeywordsComponent implements OnInit, OnDestroy {
  allKeywords$ = this._keywordsFacade.allKeywords$;
  showDeleteSelection$ = this._keywordsFacade.showDeleteSelection$;

  allSelected = false;
  canEnableDelete = false;
  allKeywordsSubs: Subscription;

  constructor(
    private _keywordsFacade: KeywordsFacade,
    private _confirmDialogService: ConfirmDialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loaderFacade: LoaderFacade,
  ) {
  }

  ngOnInit() {
    this.allKeywordsSubs = this.allKeywords$.subscribe(keywords => {
      this.canEnableDelete = keywords.some(
        (keyword) => keyword.flaggedForDelete,
      );
      this.allSelected = keywords.every(
        (keyword) => keyword.flaggedForDelete,
      );
    });
  }

  onDelete(keyword: Keyword) {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Yes, delete',
        header: `Delete keyword: ${keyword.keyword}`,
        detail: `Are you sure you want to delete keyword: ${keyword.keyword}?`,
      })
      .subscribe((res) => res && this._keywordsFacade.deleteKeyword(keyword));
  }

  onNewKeywordCreate(): void {
    this._router.navigate(['create'], { relativeTo: this._route, state: {commingFrom: 'leftNav'} });
  }

  onShowDeleteSelection(): void {
    this._keywordsFacade.showDeleteSelection();
  }

  onSelectAllKeywordsForDelete(allSelected: boolean): void {
    this._keywordsFacade.selectAllKeywordsForDelete({shouldSelect: allSelected});
  }

  onKeywordsDelete() {
    this._confirmDialogService
      .showDialog({
        confirmBtn: 'Delete',
        header: 'Delete Keywords',
        detail: 'Are you sre you want to delete selected keywords?',
      })
      .pipe(filter((value) => !!value))
      .subscribe(() => {
        this._loaderFacade.showLoader();
       this._keywordsFacade.deleteSelectedKeywords();
      });
  }

  onKeywordDeleteSelectionHide(): void {
    this._keywordsFacade.hideDeleteSelection();
  }

  onMessageDelete(deleteData: {
    keyword: string;
    shouldDelete: boolean;
  }): void {
     const keywordsUpdate: Update<Keyword> = {
      id: deleteData.keyword,
      changes: {
        flaggedForDelete: deleteData.shouldDelete
      }
    };
    this._keywordsFacade.setKeywordForDelete(keywordsUpdate);
  }

  onDeleteAllKeywords(): void {
    this._loaderFacade.showLoader();
    this._keywordsFacade.deleteAllKeywords();
  }

  ngOnDestroy(): void {
    if (this.allKeywordsSubs) {
      this.allKeywordsSubs.unsubscribe();
    }
  }
}
