import { UserEmail } from 'src/app/core/store/features/user-email/user-email.model';

export class EmailAddressControl {
  emailAddresses: UserEmail[];

  constructor(obj: Partial<EmailAddressControl>) {
    Object.assign(this, obj);
  }
}
