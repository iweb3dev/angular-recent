import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map, take } from 'rxjs/operators';

import { GroupService } from 'src/app/api/groups/groups.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { GroupMemberEditResolverModel } from '../../models/group-member-edit-resolver.model';

@Injectable()
export class GroupMemberEditResolver
  implements Resolve<Observable<GroupMemberEditResolverModel>> {
  constructor(
    private _toastService: ToastService,
    private _groupService: GroupService,
    private _loaderService: LoaderService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GroupMemberEditResolverModel> {
    const [groupId, memberId] = state?.url?.match(/\d+/g)?.map(Number);

    this._loaderService.showLoader();
    return this._groupService.getGroupMember(groupId, memberId, true).pipe(
      map((member) => {
        return { member, groupId, memberId };
      }),
      take(1),
      finalize(() => {
        if (this._loaderService.hasLoaderAttached) {
          this._loaderService.removeLoader();
        }
      }),
      catchError((response) => {
        this._toastService.addToast(
          ToastType.Error,
          'An error occurred, unable to fetch group member details'
        );
        return throwError(response);
      })
    );
  }
}
