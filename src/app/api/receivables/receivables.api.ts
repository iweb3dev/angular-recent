export const RECEIVABLES_API = `/api/receivables`;
export const GET_RECEIVABLE_ACCOUNTS = (pageSize?: number, pageIndex?: number) => `${RECEIVABLES_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const CREATE_RECEIVABLE_ACCOUNT = `${RECEIVABLES_API}`;
export const DELETE_RECEIVABLE_ACCOUNT = (accountId: number) => `${RECEIVABLES_API}/${accountId}`;
export const GET_RECEIVABLE_ACCOUNT = (accountId: number, pageSize?: number, pageIndex?: number) => `${RECEIVABLES_API}/${accountId}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const UPDATE_RECEIVABLE_ACCOUNT = (accountId: number) => `${RECEIVABLES_API}/${accountId}`;
export const UPDATE_RECEIVABLE_ACCOUNT_STATUS = (accountId: number, isActive: boolean) => `${RECEIVABLES_API}/${accountId}/${isActive}`;
