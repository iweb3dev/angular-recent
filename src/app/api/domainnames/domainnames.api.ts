export const DOMAIN_NAMES_API = `/api/domainnames`;
export const GET_DOMAIN_STATUS = (name: string) => `${DOMAIN_NAMES_API}/available/${name}`;
export const GET_DOMAIN_EMAIL_FORWARDERS = (SLD: string, TLD: string) => `${DOMAIN_NAMES_API}/email/forwarders/${SLD}/${TLD}`;
export const SET_ALL_DOMAIN_EMAIL_FORWARDERS = (SLD: string, TLD: string) => `${DOMAIN_NAMES_API}/email/setforwarders/${SLD}/${TLD}`;
export const PURCHASE_DOMAIN_NAME = `${DOMAIN_NAMES_API}/purchase`;
export const GET_SUGGESTED_DOMAIN_NAMES = (keyword: string) => `${DOMAIN_NAMES_API}/suggest/${keyword}`;
