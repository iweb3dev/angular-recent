export interface LoginModel {
  login: string;
  password: string;
  ownerID?: number;
}

export interface LoginResponseDto {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  '.expires': string;
}

export interface LoginResponseModel {
  accessToken: string;
  tokenType: 'bearer';
  expiresIn: number;
  expires: string;
}

export interface LoginState {
  formValidity: LoginErrors;
  isLoggingIn: boolean;
}

export enum LoginErrors {
  InvalidGrant = 'invalid_grant',
  Unknown = 'unknown',
  NoError = 'NoError',
}
