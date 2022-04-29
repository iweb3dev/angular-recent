import { SocialLoginState } from '../store/social-login.models';

export const SocialUserDefaultState: SocialLoginState = {
  isSocialUser: false,
  socialUser: undefined,
  socialUserRemoved: false,
  isNewSocialSignup: false,
  socialUserRegistered: false,
  associatedAccounts: undefined,
};
