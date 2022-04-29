import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

@Component({
  selector: 'app-plan-details-table',
  templateUrl: './plan-details-table.component.html',
  styleUrls: ['./plan-details-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTableComponent implements OnInit {
  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  essentialPlan: PackageFeatures;

  @Input()
  standardPlan: PackageFeatures;

  @Input()
  premiumPlan: PackageFeatures;

  @Input()
  contract: number;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  get isMobileView(): boolean {
    return window.innerWidth <= 599;
  }

  ngOnInit(): void {}

  onPlanUpgrade(packageId: number): void {
    this._router.navigate(['../', 'plan-upgrade', packageId], {
      relativeTo: this._route,
    });
  }

  onPlanDowngrade(packageId: number): void {
    this._router.navigate(['../', 'plan-downgrade', packageId], {
      relativeTo: this._route,
    });
  }

  onPlanExtend(packageId: number): void {
    this._router.navigate(['../', 'plan-extend', packageId], {
      relativeTo: this._route,
    });
  }
}
