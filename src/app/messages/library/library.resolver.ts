import { GroupsFilter } from './../../groups/enums/group-search-filter.enum';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GroupDisplay } from '@api/groups/groups.models';
import { GroupService } from '@api/groups/groups.service';
import { PagedList } from '@api/shared/shared.models';
import { GroupManagersFacade } from '@core/store/features/group-managers/group-managers.facade';
import { UserSessionService } from '@core/user-session/user-session.service';
import { ToastService, ToastType } from '@shared/components/toast/service/toast.service';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { MessagePagedObjectsDto } from 'src/app/api/messages/messages.models';

import { MessagesService } from 'src/app/api/messages/messages.service';
import { GroupSearchFilter } from 'src/app/groups/models/group-search-filter.model';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessagesListModel } from '../messages.models';
import { MessageLibraryFacade } from '../state/message-library/message-library.facade';

@Injectable()
export class LibraryResolver implements Resolve<MessagePagedObjectsDto[]> {
  groupManagers$ = this._groupManagersFacade.allGroupManagers$.pipe(
    map((groupManagers) => {
      const accessGroupsArray = groupManagers.map((groupManager: any) => groupManager.groups);

      const newAccessGroupsArray = [].concat.apply([], accessGroupsArray);

      const uniqueAccessGroupArray = Array.from(new Set(newAccessGroupsArray.map((a) => a.groupID))).map((groupID) => {
        return newAccessGroupsArray.find((a) => a.groupID === groupID);
      });

      return uniqueAccessGroupArray.map((value) => {
        return {
          id: value.groupID,
          groupName: value.groupName,
          keyword: '',
          totalGroups: 0,
        };
      });
    })
  );

  groupManagerSubs: Subscription;
  public groups: Array<GroupDisplay> = [];
  public isManager: boolean;
  public groupNames: Array<string> = [];
  private searchFilter: GroupSearchFilter = { ...GroupsFilter };

  constructor(
    private _messagesService: MessagesService,
    private _messageLibraryFacade: MessageLibraryFacade,
    private _groupService: GroupService,
    private _toastService: ToastService,
    private _groupManagersFacade: GroupManagersFacade,
    private _userSessionService: UserSessionService,
    private _loaderService: LoaderService
  ) {
    this.isManager = this._userSessionService.isManager;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MessagesListModel[]> {
    this._loaderService.showLoader();

    if (!this.isManager) {
      this.getGroups(this.searchFilter);
    } else {
      this.groupManagerSubs = this.groupManagers$.subscribe((groups: any) => {
        this.groups = groups;
        this.groupNames = groups.map(({ groupName }) => groupName.toLowerCase());
      });
    }

    this._messagesService
      .fetchMessages()
      .pipe(
        map((messages) =>
          messages.pagedObjects.map((message) => ({
            ...message,
            flaggedForDelete: false,
          }))
        )
      )
      .subscribe((messages) => {
        this._loaderService.removeLoader();
        if (!this.isManager) {
          this._messageLibraryFacade.setMessages(messages);
        } else {
          this._messageLibraryFacade.setMessages(
            messages.filter(
              ({ groupsLastSentTo }) => this.groupNames.includes(groupsLastSentTo.toLowerCase()) || groupsLastSentTo.length === 0
            )
          );
        }
      });

    return this._messageLibraryFacade.messages$.pipe(take(1));
  }

  private getGroups(searchFilter: GroupSearchFilter, searchInput = ''): void {
    this._groupService
      .getGroupNameSearch(searchInput, +searchFilter.sortOrder, searchFilter.pageSize, searchFilter.pageIndex)
      .pipe(
        take(1),
        catchError((error) => {
          this._toastService.addToast(ToastType.Error, 'An error occurred, unable to fetch groups');
          return throwError(error);
        })
      )
      .subscribe((response: PagedList<GroupDisplay>) => {
        this.groups = response.pagedObjects;
        this.groupNames = response.pagedObjects.map(({ groupName }) => groupName.toLowerCase());
      });
  }
}
