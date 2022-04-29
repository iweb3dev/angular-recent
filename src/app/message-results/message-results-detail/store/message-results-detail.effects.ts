import { PagedList } from 'src/app/api/shared/shared.models';
import { GroupsFilter } from './../../../groups/enums/group-search-filter.enum';
import { GroupSearchFilter } from 'src/app/groups/models/group-search-filter.model';
import { GroupDisplay } from 'src/app/api/groups/groups.models';
import { UserSessionService } from '@core/user-session/user-session.service';
import { GroupManagersFacade } from '@core/store/features/group-managers/group-managers.facade';
import { GroupService } from '@api/groups/groups.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Subscription, throwError } from 'rxjs';
import { catchError, map, switchMap, tap, take, filter } from 'rxjs/operators';
import { CommunicationsService } from 'src/app/api/communications/communications.service';
import { ToastService, ToastType } from 'src/app/shared/components/toast/service/toast.service';
import {
  fetchDeliveryStatisticsError,
  fetchDeliveryStatisticsReslove,
  fetchDeliveryStatisticsStart,
  fetchMessageDetailsError,
  fetchMessageDetailsResolve,
  fetchMessageDetailsStart,
  fetchCommunicationSearch,
  fetchCommunicationSearchResolve,
  fetchCommunicationSearchError,
} from './message-results-detail.actions';

@Injectable({
  providedIn: 'root',
})
export class MessageResultsDetailEffects {
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
    private _actions$: Actions,
    private _communicationService: CommunicationsService,
    private _groupService: GroupService,
    private _groupManagersFacade: GroupManagersFacade,
    private _userSessionService: UserSessionService,
    private _toastService: ToastService
  ) {
    this.isManager = this._userSessionService.isManager;
  }

  fetchDeliveryStatisticsStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchDeliveryStatisticsStart),
      switchMap(({ id }) =>
        this._communicationService.getCommunicationDeliveryStatistics(id).pipe(
          switchMap((res) => [
            fetchDeliveryStatisticsReslove({
              deliveryStatistics: res,
            }),
          ]),
          catchError(() => of(fetchDeliveryStatisticsError()))
        )
      )
    )
  );

  fetchDeliveryStatisticsError$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fetchDeliveryStatisticsError),
        tap(() => this._toastService.addToast(ToastType.Error, 'Failed fetching delivery statistics'))
      ),
    { dispatch: false }
  );

  fetchMessageDetailsStart$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchMessageDetailsStart),
      switchMap(({ id }) =>
        this._communicationService.getAllCommunicationDetails(id, '', 25, 0).pipe(
          switchMap(({ pagedObjects }) => [
            fetchMessageDetailsResolve({
              messageRecipients: pagedObjects.map((s) => ({ ...s })),
            }),
          ]),
          catchError(() => of(fetchMessageDetailsError))
        )
      )
    )
  );

  fetchMessageDetailsError$ = createEffect(() =>
    this._actions$.pipe(
      ofType(fetchMessageDetailsError),
      tap(() => this._toastService.addToast(ToastType.Error, 'Failed fetching message recipients'))
    )
  );

  fetchCommunicationSearch$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(fetchCommunicationSearch),
      switchMap(({ searchCriteria, groupId, historyTypeId, pageSize, pageIndex }) => {
        if (this.isManager) {
          return this.groupManagers$.pipe(
            switchMap((groups: any) => {
              const sharedGroupNames = groups.map(({ groupName }) => groupName.toLowerCase());

              return this._communicationService.getCommunicationsSearch(searchCriteria, groupId, historyTypeId, pageSize, pageIndex).pipe(
                switchMap((pagedObjects) => {
                  const messageSearchResult = pagedObjects.pagedObjects
                    ? pagedObjects.pagedObjects.map((s) => ({ ...s }))
                    : pagedObjects.map((s) => ({ ...s }));

                  return [
                    fetchCommunicationSearchResolve({
                      messageSearchResult: messageSearchResult.filter(({ groupNames }) => {
                        return groupNames.filter((_groupName: string) => sharedGroupNames.includes(_groupName.toLowerCase())).length > 0;
                      }),
                    }),
                  ];
                }),
                catchError(() => of(fetchCommunicationSearchError))
              );
            })
          );
        } else {
          return this._communicationService.getCommunicationsSearch(searchCriteria, groupId, historyTypeId, pageSize, pageIndex).pipe(
            switchMap((pagedObjects) => [
              fetchCommunicationSearchResolve({
                messageSearchResult: pagedObjects.pagedObjects
                  ? pagedObjects.pagedObjects.map((s) => ({ ...s }))
                  : pagedObjects.map((s) => ({ ...s })),
              }),
            ]),
            catchError(() => of(fetchCommunicationSearchError))
          );
        }
      })
    );
  });

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
      });
  }
}
