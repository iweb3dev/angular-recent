export enum AuthEnum {
  Token = 'TOKENS',
  Manager = 'isAccountBeingManaged'
}

export enum TokensEnum {
  AccessToken = 'accessToken',
  Expires = 'expires',
}

export interface TokenModel {
  accessToken: string;
  expires: string;
}
