export interface SocialAuthQueryModel {
  provider: string;
  response_type: string;
  client_id: string;
  redirect_url?: string;
  state: string;
}

export interface ExternalUserInfoReqModel {
  returnUrl: string;
  generateState: string;
  rnd: string;
}

export interface ExternalUserInfoModel {
  externalLoginProviders: ExternalLoginProvider[];
  localLoginProvider: string;
  logins: Logins[];
  userName: string;
}

export interface ExternalLoginProvider {
  name: string;
  state: string;
  url: string;
}

interface Logins {
  loginProvider: string;
  providerKey: string;
}
