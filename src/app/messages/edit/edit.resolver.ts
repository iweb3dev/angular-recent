import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessageStateModel } from 'src/app/core/store/features/new-message/new-message.models';
import { MessageDataService } from 'src/app/domain/message-data/message-data.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Injectable()
export class EditResolver implements Resolve<MessageStateModel> {
  constructor(
    private _messageDataService: MessageDataService,
    private _loaderService: LoaderService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<MessageStateModel> {
    this._loaderService.showLoader();
    return this._messageDataService
      .fetchMessageSnapshot(parseInt(route.params.id, 10))
      .pipe(tap(() => this._loaderService.removeLoader()));
  }
}
