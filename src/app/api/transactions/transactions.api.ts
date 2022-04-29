export const ORDERS_API = `/api/financial/orders`;
export const TRANSACTIONS_API = `/api/financial/transactions`;

export const GET_USERS_ORDER_RECEIPTS_LIST = (pageSize?: number, pageIndex?: number) => `${ORDERS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_SPECIFIC_ORDER_RECEIPT = (orderId: number) => `${ORDERS_API}/${orderId}`;
export const GET_SPECIFIC_ORDER_DETAILS = (orderId: number) => `${ORDERS_API}/${orderId}/details`;
export const GET_TRANSACTIONS = (pageSize: number, pageIndex: number) => `${TRANSACTIONS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
