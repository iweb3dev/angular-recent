import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GroupManagersFacade } from 'src/app/core/store/features/group-managers/group-managers.facade';
import { LoaderFacade } from '../../core/store/features/loader/loader.facade';

@Component({
  selector: 'app-group-managers-detail',
  templateUrl: './group-managers-detail.component.html',
  styleUrls: ['./group-managers-detail.component.scss']
})
export class GroupManagersDetailComponent implements OnInit {

  hasGroupManagers$ = this._groupManagersFacade.allGroupManagers$
    .pipe(map((s: any) => !!s.length));

  constructor(
    private _groupManagersFacade: GroupManagersFacade,
    private _loaderFacade: LoaderFacade
    ) {}

  ngOnInit(): void {
    // this._loaderFacade.showLoader();
  }

}
