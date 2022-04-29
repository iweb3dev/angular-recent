import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const EXTERNAL_LOGIN_API = '/api/externallogins';

export const GET_LOGIN_INFO = `${ALLOW_ANONYMOUS}${EXTERNAL_LOGIN_API}`;
export const ADD_EXTERNAL_LOGIN = `${EXTERNAL_LOGIN_API}/add`;
export const ASSOCIATED_ACCOUNTS_EXTERNAL_LOGIN = `${EXTERNAL_LOGIN_API}/info`;
export const INFO_EXTERNAL_LOGIN = `${ALLOW_ANONYMOUS}${EXTERNAL_LOGIN_API}/info?`;
export const GET_LOGIN = `${ALLOW_ANONYMOUS}${EXTERNAL_LOGIN_API}/login`;
export const REMOVE_LOGIN = `${EXTERNAL_LOGIN_API}/remove`;
export const SEARCH_USER = `${ALLOW_ANONYMOUS}${EXTERNAL_LOGIN_API}/search`;
