export const REMINDERS_API = `/api/reminders`;
export const DELETE_ALL_REMINDERS = `${REMINDERS_API}`;
export const DELETE_SPECIFIC_REMINDER = (reminderId: number) => `/api/reminder?reminderId=${reminderId}`;
export const ADD_UPDATE_REMINDER = `${REMINDERS_API}`;
export const GET_USER_REMINDERS = (pageSize?: number, pageIndex?: number) => `${REMINDERS_API}?pageSize=${pageSize}&pageIndex=${pageIndex}`;
