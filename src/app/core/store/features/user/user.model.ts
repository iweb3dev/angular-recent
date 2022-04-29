import { Picture, TimeZone } from 'src/app/api/shared/shared.models';
import {
  AccountsManaged,
  Address,
  BoughtPhoneNumber,
  EmailAddress,
  Package,
  PhoneNumber,
  UserModel,
  UsersSubscription,
} from 'src/app/api/users/users.models';
export interface UserStateModel {
  user: UserModel;
  mainUserInfo: MainUserInfoModel;
}

export interface MainUserInfoModel {
  displayName: string;
  userCredits: number;
  userPicture: Picture;
  firstName: string;
  addresses: Address[];
  organization: string;
  emailAddresses: EmailAddress[];
  id: number;
  phoneNumbers: PhoneNumber[];
  telUserName: string;
  customerProfileID: number;
  package: Package;
  userSubscription: UsersSubscription;
  timeZone: TimeZone;
  userMemberPhoneCount: number;
  username: string;
  boughtPhoneNumbers: BoughtPhoneNumber[];
  accountsManaged: AccountsManaged[];
  password: string;
}
