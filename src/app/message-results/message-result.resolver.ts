import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { MessagePagedObjectsDto } from '@api/messages/messages.models';
import { MessagesService } from '@api/messages/messages.service';
import { LoaderService } from '@shared/components/loader/loader.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MessagesListModel } from '../messages/messages.models';

@Injectable({
  providedIn: 'root',
})
export class MessageResultResolver
  implements Resolve<MessagePagedObjectsDto[]> {
  constructor(
    private _messagesService: MessagesService,
    private _loaderService: LoaderService,
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<MessagesListModel[]> {
    this._loaderService.showLoader();
    return this._messagesService.fetchMessages().pipe(
      map((messages) =>
        messages.pagedObjects.map((message) => ({
          ...message,
          flaggedForDelete: false,
        })),
      ),
      tap(() => this._loaderService.removeLoader()),
    );
  }
}
