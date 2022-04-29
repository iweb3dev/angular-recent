import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { PlanDetailsActionLabels } from '../plan-details.table.models';

@Component({
  selector: 'app-plan-details-table-desktop',
  templateUrl: './plan-details-table-desktop.component.html',
  styleUrls: ['./plan-details-table-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailsTableDesktopComponent implements OnInit {
  PlanDetailsActionLabels = PlanDetailsActionLabels;

  essentialsButtonLabel = PlanDetailsActionLabels.Upgrade;
  standardButtonLabel = PlanDetailsActionLabels.Upgrade;
  premiumButtonLabel = PlanDetailsActionLabels.Upgrade;

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
  essentialPlan: PackageFeatures;

  @Input()
  standardPlan: PackageFeatures;

  @Input()
  premiumPlan: PackageFeatures;

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

  get shouldExtendPremium(): boolean {
    return (
      this.hasPremiumPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  get shouldDowngradePremium(): boolean {
    return (
      this.hasPremiumPlan &&
      this._currentContract < this._userInfo.package.memberCount
    );
  }

  get shouldDowngradeStandard(): boolean {
    return (
      this.hasPremiumPlan ||
      (this.hasStandardPlan &&
        this._currentContract < this._userInfo.package.memberCount)
    );
  }

  get shouldExtendStandard(): boolean {
    return (
      this.hasStandardPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  get shouldDownGradeEssentials(): boolean {
    return (
      this.hasPremiumPlan ||
      this.hasStandardPlan ||
      (this.hasEssentialsPlan &&
        this._currentContract < this._userInfo.package.memberCount)
    );
  }

  get shouldExtendEssentials(): boolean {
    return (
      this.hasEssentialsPlan &&
      this._currentContract === this._userInfo.package.memberCount
    );
  }

  ngOnInit(): void {}

  onPremiumChange(): void {
    if (this.shouldDowngradePremium) {
      this.downgradePlan.emit(this.premiumPlan.id);
    } else if (this.shouldExtendPremium) {
      this.extendPlan.emit(this.premiumPlan.id);
    } else {
      this.upgradePlan.emit(this.premiumPlan.id);
    }
  }

  onStandardChange(): void {
    if (this.shouldDowngradeStandard) {
      this.downgradePlan.emit(this.standardPlan.id);
    } else if (this.shouldExtendStandard) {
      this.extendPlan.emit(this.standardPlan.id);
    } else {
      this.upgradePlan.emit(this.standardPlan.id);
    }
  }

  onEssentialChange(): void {
    if (this.shouldDownGradeEssentials) {
      this.downgradePlan.emit(this.essentialPlan.id);
    } else if (this.shouldExtendEssentials) {
      this.extendPlan.emit(this.essentialPlan.id);
    } else {
      this.upgradePlan.emit(this.essentialPlan.id);
    }
  }

  private createStandardButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (this.shouldDowngradeStandard) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    if (this.shouldExtendStandard) {
      label = PlanDetailsActionLabels.Extend;
    }

    return label;
  }

  private createEssentialsButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (this.shouldDownGradeEssentials) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    if (this.shouldExtendEssentials) {
      label = PlanDetailsActionLabels.Extend;
    }

    return label;
  }

  private createPremiumButtonLabel(): PlanDetailsActionLabels {
    let label = PlanDetailsActionLabels.Upgrade;

    if (!this.hasPremiumPlan) {
      label = PlanDetailsActionLabels.Upgrade;
    }

    if (this.shouldExtendPremium) {
      label = PlanDetailsActionLabels.Extend;
    }
    if (this.shouldDowngradePremium) {
      label = PlanDetailsActionLabels.Downgrade;
    }

    return label;
  }
}
