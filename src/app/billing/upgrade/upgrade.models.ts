import { PrePayOption } from 'src/app/api/lookups/lookups.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';

export interface UpgradeDataResolverModel {
  packageFeatures: PackageFeatures;
  prepayOptions: PrePayOption[];
  rewardsBalance: RewardsUser;
}
