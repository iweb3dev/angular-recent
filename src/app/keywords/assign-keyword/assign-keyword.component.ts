import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GroupService } from 'src/app/api/groups/groups.service';
import { KeywordsService } from 'src/app/api/keywords/keywords.service';
import { LoaderFacade } from 'src/app/core/store/features/loader/loader.facade';
import { Subscription, noop } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import { WELCOME_MESSAGE } from './assign-keyword.const';
@Component({
  selector: 'app-assign-keyword',
  templateUrl: './assign-keyword.component.html',
  styleUrls: ['./assign-keyword.component.scss'],
})
export class AssignKeywordComponent implements OnInit, OnDestroy {
  keyword: string;
  public groups: any = [];
  form: FormGroup;
  isEditMode: boolean;
  private subscriptions = new Subscription();

  constructor(
    private _keywordsServices: KeywordsService,
    private _groupService: GroupService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _keywordsFacade: KeywordsFacade,
    private _loaderFacade: LoaderFacade,
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this._route.params.subscribe((params: Params) => {
      const keyword = params['keyword'];
      if (!keyword) {
        this._router.navigate(['../create'], { relativeTo: this._route });
      } else {
        this._keywordsFacade.allKeywords$.subscribe((allKeywords) => {
          if (allKeywords) {
            const existingKeyword = allKeywords.find(
              (k) => k?.keyword === keyword,
            );
            if (existingKeyword?.groupName && existingKeyword?.groupId) {
              this.isEditMode = true;
              this.form.patchValue({ keyword: existingKeyword?.keyword });
              this.form.patchValue({ groupId: existingKeyword?.groupId });
              this.form.patchValue({
                description: existingKeyword?.description,
              });
            } else {
              this.isEditMode = false;
              this.form.patchValue({ keyword: keyword });
              this.form.patchValue({
                description: WELCOME_MESSAGE,
              });
            }
          }
        });
        this.keyword = keyword;
      }
    });
    this.load_groups();
  }

  private buildForm() {
    this.form = new FormGroup({
      keyword: new FormControl('', [Validators.required]),
      groupId: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(75),
      ]),
    });
  }

  load_groups(): void {
    this.subscriptions.add(
      this._groupService.fetchGroups().subscribe(
        (resp: any) => {
          if (!this.isEditMode) {
            this.groups = resp.pagedObjects.filter((group) => !group.keyword);
          } else {
            this.groups = resp.pagedObjects.filter(
              (group) => !group.keyword || group.id === this.form.value.groupId,
            );
          }
        },
        (err) => {
          this.groups = [];
        },
      ),
    );
  }

  onSaveKeywordAssignment(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const groupName = this.groups.find(
      (x) => x.id === this.form.value.groupId,
    )?.groupName;
    let keyword = {
      ...this.form.value,
      groupName: groupName,
      parentKeywordID: 0,
      dualOptInRequired: true,
      userID: 0,
      smsShortCodeGroupID: 0,
    };

    this._loaderFacade.showLoader();
    this.subscriptions.add(
      this._keywordsFacade.allKeywords$.subscribe(
        (keywords) => {
          const savedKeyword = keywords.find(
            (x) => x.keyword === this.form.value.keyword,
          );
          keyword = {
            ...keyword,
            dualOptInRequired: savedKeyword.dualOptInRequired,
            userID: savedKeyword.userID,
            smsShortCodeGroupID: savedKeyword.smsShortCodeGroupID,
          };
        },
        (err) => {
          this._loaderFacade.removeLoader();
        },
      ),
    );

    this.subscriptions.add(
      this._keywordsServices.updateKeyword(keyword).subscribe(
        noop,
        (err) => {
          this._loaderFacade.removeLoader();
        },
        () => {
          this._loaderFacade.removeLoader();
          if (!this.isEditMode) {
            this._router.navigate(['../../view', this.keyword], {
              relativeTo: this._route,
            });
          } else {
            this._router.navigate(['/keywords'], { relativeTo: this._route });
          }
        },
      ),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
