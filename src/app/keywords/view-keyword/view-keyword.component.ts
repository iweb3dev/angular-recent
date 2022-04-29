import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-view-keyword',
  templateUrl: './view-keyword.component.html',
  styleUrls: ['./view-keyword.component.scss']
})
export class ViewKeywordComponent implements OnInit {
  keyword: string;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private clipboardApi: ClipboardService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      const keyword = params['keyword'];
      if (!keyword) {
        this._router.navigate(['../create'], {relativeTo: this._route});
      } else {
        this.keyword = keyword;
      }
    });
  }

  copyKeyword() {
    this.clipboardApi.copyFromContent(this.keyword);
  }

}
