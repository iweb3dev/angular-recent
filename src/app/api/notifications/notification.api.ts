export const NOTIFICATIONS_API = `/api/notifications`;
export const DELETE_ALL_NOTIFICATIONS_ASSIGNED_TO_THIS_USER = `${NOTIFICATIONS_API}`;
export const GET_USER_NOTIFICATIONS = (pageSize?: number, pageIndex?: number) => `${NOTIFICATIONS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const DELETE_SPECIFIC_NOTIFICATION = (notificationId: number) => `${NOTIFICATIONS_API}/${notificationId}`;
export const GET_SPECIFIC_NOTIFICATION
  = (notificationId: number, pageSize?: number, pageIndex?: number) =>
    `${NOTIFICATIONS_API}/${notificationId}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
export const GET_USER_NOTIFICATIONS_COUNT = `${NOTIFICATIONS_API}/count`;
