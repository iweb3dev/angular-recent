export interface AccountLoginModel {
  loginUserName: string;
  passowrd: string;
  rememberMe: boolean;
  returnUrl: string;
  loginMethod: number;
}

export interface RegisterUserModel {
  accessCode: string;
  password: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  organizationSubTypesValue: number;
  organizationTypesValue: number;
  organizationName: string;
  referralCode: string;
  userPhoneNumber: string;
  webUserName: string;
  isTrialRegistration: boolean;
  howYouFoundOutAboutUsId: number;
  signUpType: number;
  packageId: number;
  loginMethod: number;
}
