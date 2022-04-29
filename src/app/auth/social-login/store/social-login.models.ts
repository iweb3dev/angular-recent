import { SocialUser } from 'angularx-social-login';

import { TimeZones } from '@api/lookups/lookups.models';
import { UserModelDto, AccountsManaged } from '@api/users/users.models';
import { ExternalUserInfoModel } from '@api/external-logins/external-login.model';

export interface SearchSocialUser {
  provider: string;
  providerKey: string;
}

export interface SocialProvider {
  providerKey: string;
  loginProvider: string;
}

export interface RegisterSocialUser extends SocialUser {
  user: UserModelDto;
}

export interface SocialLoginState {
  isSocialUser: boolean;
  isNewSocialSignup: boolean;
  socialUserRemoved: boolean;
  socialUserRegistered: boolean;
  socialUser: SearchSocialUserResponse;
  associatedAccounts: ExternalUserInfoModel;
}

export interface SearchSocialUserResponse {
  id: number;
  pin: number;
  credits: number;
  lastName: string;
  pictureID: number;
  isLocked: boolean;
  productID: number;
  firstName: string;
  insertedDate: Date;
  phoneNumber: string;
  webUserName: string;
  telUserName: string;
  webPassword: string;
  telPassword: string;
  isCorpUser: boolean;
  timeZone: TimeZones;
  emailAddress: string;
  organization: string;
  userTypeValue: number;
  groupCreated: boolean;
  purchaseMade: boolean;
  isTmpPassword: boolean;
  isSingleSignOn: boolean;
  membersCreated: boolean;
  applicationType: number;
  isAccountAdmin: boolean;
  messageCreated: boolean;
  customerProfileID: number;
  accountManagerName: string;
  communicationSent: boolean;
  failedLoginAttempts: number;
  twilioSubAccountSID: string;
  isAccountActivated: boolean;
  accountManagerUserID: number;
  organizationTypesValue: number;
  isAccountBeingManaged: boolean;
  organizationSubTypesValue: number;
  twilioSubAccountAuthToken: string;
  displayAdditionalInfoToUser: boolean;
  accountsManaged: Array<AccountsManaged>;
}
