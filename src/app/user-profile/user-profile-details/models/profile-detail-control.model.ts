import { TimeZone } from 'src/app/core/store/features/lookups/lookups.models';

export class ProfileDetailControl {
  firstName: string;
  lastName: string;
  organization: string;
  organizationTypesValue: number;
  timeZone: TimeZone;

  constructor(obj: Partial<ProfileDetailControl>) {
    Object.assign(this, obj);
  }
}
