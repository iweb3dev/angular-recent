import { PrePayOption } from 'src/app/api/lookups/lookups.models';
import { PackageFeatures } from 'src/app/api/packages/packages.models';
import { RewardsUser } from 'src/app/api/rewards/rewards.models';

export interface ExtendDataResolverModel {
  packageFeatures: PackageFeatures;
  prepayOptions: PrePayOption[];
  rewardBalance: RewardsUser;
}
