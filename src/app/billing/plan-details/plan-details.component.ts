import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.scss'],
})
export class PlanDetailsComponent implements OnInit {
  userInfo$ = this._userFacade.currentUserInfo$;
  contactsList$: Observable<number[]>;
  contactListControl = new FormControl();

  essentialPlan: PackageFeatures;
  standardPlan: PackageFeatures;
  premiumPlan: PackageFeatures;

  private _packages: PackageFeatures[];
  private _credits: AdditionalCredit[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userFacade: UserFacade,
  ) {
    this._packages = _route.snapshot.data.plans;
  }

  get credits(): AdditionalCredit[] {
    return this._credits;
  }

  ngOnInit(): void {
    this.contactsList$ = this.createMemberCountStream();

    this.essentialPlan = this.getPackage(15, PackageTypeIds.Essentials);
    this.standardPlan = this.getPackage(15, PackageTypeIds.Standard);
    this.premiumPlan = this.getPackage(15, PackageTypeIds.Premium);
  }

  selectContract(value): void {
    this.essentialPlan = this.getPackage(value, PackageTypeIds.Essentials);
    this.standardPlan = this.getPackage(value, PackageTypeIds.Standard);
    this.premiumPlan = this.getPackage(value, PackageTypeIds.Premium);
  }

  showCreditsColumn(): void {
    this._router.navigate(['../', 'credits'], { relativeTo: this._route });
  }

  private createMemberCountStream(): Observable<number[]> {
    return combineLatest([this._userFacade.userPackage$, this.userInfo$]).pipe(
      switchMap(([userPackage, userInfo]) => {
        const isOnPlan =
          userPackage.packageTypeId === PackageTypeIds.Essentials ||
          userPackage.packageTypeId === PackageTypeIds.Standard ||
          userPackage.packageTypeId === PackageTypeIds.Premium;

        const memberCountList = this._packages
          .filter((pack) =>
            isOnPlan
              ? pack.packageTypeId === PackageTypeIds.Premium &&
                pack.memberCount >= userInfo.userMemberPhoneCount &&
                pack.memberCount > 10
              : pack.packageTypeId === PackageTypeIds.Premium &&
                pack.memberCount > 10 &&
                pack.memberCount >= userInfo.userMemberPhoneCount,
          )
          .map((pack) => pack.memberCount)
          .sort((a, b) => a - b);

        const contactAmount = isOnPlan
          ? memberCountList.find((count) => count >= userPackage.memberCount)
          : memberCountList[0];

        this.selectContract(contactAmount);
        return of(memberCountList).pipe(
          tap(() =>
            this.contactListControl.setValue(contactAmount),
          ),
        );
      }),
    );
  }

  private getPackage(
    memberCount: number,
    packageType: PackageTypeIds,
  ): PackageFeatures {
    return this._packages
      .filter((pack) => pack.packageTypeId === packageType)
      .find((pack) => pack.memberCount === memberCount);
  }
}
