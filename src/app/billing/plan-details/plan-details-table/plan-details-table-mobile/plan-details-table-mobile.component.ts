import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { AdditionalCredit } from 'src/app/api/lookups/lookups.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PlanDetailsActionLabels } from '../plan-details.table.models';

@Component({
  selector: 'app-plan-details-table-mobile',
  templateUrl: './plan-details-table-mobile.component.html',
  styleUrls: ['./plan-details-table-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTableMobileComponent implements OnInit {
  PlanDetailsActionLabels = PlanDetailsActionLabels;

  essentialsButtonLabel = PlanDetailsActionLabels.Upgrade;
  standardButtonLabel = PlanDetailsActionLabels.Upgrade;
  premiumButtonLabel = PlanDetailsActionLabels.Upgrade;

  @Input()
  essentialPlan: PackageFeatures;

  @Input()
  standardPlan: PackageFeatures;

  @Input()
  premiumPlan: PackageFeatures;

  @Input()
  set userInfo(userInfo: MainUserInfoModel) {
    if (!userInfo) {
      return;
    }

    this._userInfo = userInfo;
    this.premiumButtonLabel = this.createPremiumButtonLabel();
    this.essentialsButtonLabel = this.createEssentialsButtonLabel();
    this.standardButtonLabel = this.createStandardButtonLabel();
  }

  @Input()
  set contract(contract: number) {
    this._currentContract = contract;
    if (!this._userInfo) {
      return;
    }

    this.premiumButtonLabel = this.createPremiumButtonLabel();
    this.essentialsButtonLabel = this.createEssentialsButtonLabel();
    this.standardButtonLabel = this.createStandardButtonLabel();
  }

  @Output()
  upgradePlan = new EventEmitter<number>();

  @Output()
  extendPlan = new EventEmitter<number>();

  @Output()
  downgradePlan = new EventEmitter<number>();


  private _currentContract: number;
  private _userInfo: MainUserInfoModel;
  constructor() {}

  get hasPremiumPlan(): boolean {
    return this._userInfo?.package.packageTypeId === PackageTypeIds.Premium;
  }

  get hasStandardPlan(): boolean {
    return this._userInfo?.package.packageTypeId === PackageTypeIds.Standard;
  }

  get hasEssentialsPlan(): boolean {
    return this._userInfo?.package.packageTypeId === PackageTypeIds.Essentials;
  }

  ngOnInit(): void {}

  onPremiumChange(): void {
    if (this._shouldDowngradePremium) {
      this.downgradePlan.emit(this.premiumPlan.id);
    } else if (this._shouldExtendPremium) {
      this.extendPlan.emit(this.premiumPlan.id);
    } else {
      this.upgradePlan.emit(this.premiumPlan.id);
    }
  }

  onStandardChange(): void {
    if (this._shouldDowngradeStandard) {
      this.downgradePlan.emit(this.standardPlan.id);
    } else if (this._shouldExtendStandard) {
      this.extendPlan.emit(this.standardPlan.id);
    } else {
      this.upgradePlan.emit(this.standardPlan.id);
    }
  }

  onEssentialChange(): void {
    if (this._shouldDownGradeEssentials) {
      this.downgradePlan.emit(this.essentialPlan.id);
    } else if (this._shouldExtendEssentials) {
      this.extendPlan.emit(this.essentialPlan.id);
    } else {
      this.upgradePlan.emit(this.essentialPlan.id);
    }
  }
  private get _shouldDowngradeStandard(): boolean {
    return (
      this.hasPremiumPlan ||
      (this.hasStandardPlan &&
        this._currentContract < this._userInfo.package.memberCount)
    );
  }

  private get _shouldExtendStandard(): boolean {
    return (
      this.hasStandardPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  private createStandardButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (this._shouldDowngradeStandard) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    if (this._shouldExtendStandard) {
      label = PlanDetailsActionLabels.Extend;
    }

    return label;
  }

  private get _shouldDownGradeEssentials(): boolean {
    return (
      this.hasPremiumPlan ||
      this.hasStandardPlan ||
      this._currentContract < this._userInfo.package.memberCount
    );
  }

  private get _shouldExtendEssentials(): boolean {
    return (
      this.hasEssentialsPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  private createEssentialsButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (this._shouldDownGradeEssentials) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    if (this._shouldExtendEssentials) {
      label = PlanDetailsActionLabels.Extend;
    }

    return label;
  }

  private get _shouldExtendPremium(): boolean {
    return (
      this.hasPremiumPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  private get _shouldDowngradePremium(): boolean {
    return (
      this.hasPremiumPlan &&
      this._currentContract < this._userInfo.package.memberCount
    );
  }

  private createPremiumButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (!this.hasPremiumPlan) {
      label = PlanDetailsActionLabels.Upgrade;
    }

    if (this._shouldExtendPremium) {
      label = PlanDetailsActionLabels.Extend;
    }
    if (this._shouldDowngradePremium) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    return label;
  }
}
