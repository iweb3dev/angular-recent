import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { throwError, Observable } from 'rxjs';
import { catchError, finalize, map, take } from 'rxjs/operators';

import { MemberService } from 'src/app/api/members/members.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import {
  ToastType,
  ToastService,
} from 'src/app/shared/components/toast/service/toast.service';

import { MemberEditResolvereModel } from '../models/member-edit-resolver.model';

@Injectable()
export class MemberEditResolver
  implements Resolve<Observable<MemberEditResolvereModel>> {
  constructor(
    private _toastService: ToastService,
    private _memberService: MemberService,
    private _loaderService: LoaderService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<MemberEditResolvereModel> {
    const memberId = route.params['id'];

    this._loaderService.showLoader();
    return this._memberService.getMember(memberId).pipe(
      map((member) => {
        return { member, memberId };
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
          'An error occurred, unable to fetch member'
        );
        return throwError(response);
      })
    );
  }
}
