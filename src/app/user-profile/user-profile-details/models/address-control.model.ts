import { UserAddress } from 'src/app/core/store/features/user-address/user-address.model';

 export class AddressControl {
  addresses: UserAddress[];

  constructor(obj: Partial<AddressControl>) {
    Object.assign(this, obj);
  }
 }
