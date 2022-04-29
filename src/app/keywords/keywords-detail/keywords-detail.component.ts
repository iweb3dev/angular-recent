import { Component } from '@angular/core';
import { KeywordsFacade } from 'src/app/core/store/features/keywords/keywords.facade';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-keywords-detail',
  templateUrl: './keywords-detail.component.html',
  styleUrls: ['./keywords-detail.component.scss']
})
export class KeywordsDetailComponent {

  hasKeywords$ = this._keywordsFacade.allKeywords$
    .pipe(map(s => !!s.length));

  constructor(private _keywordsFacade: KeywordsFacade) {}

}
