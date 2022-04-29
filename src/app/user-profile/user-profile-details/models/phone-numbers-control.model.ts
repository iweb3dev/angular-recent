import { UserPhone } from 'src/app/core/store/features/user-phones/user-phones.model';

export class PhoneNumberControl {
  phoneNumbers: UserPhone[];

  constructor(obj: Partial<PhoneNumberControl>) {
    Object.assign(this, obj);
  }
}
