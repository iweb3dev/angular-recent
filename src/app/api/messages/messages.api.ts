import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const MESSAGE_API_BASE = `/api/messages`;

export const DELETE_MESSAGES = `${MESSAGE_API_BASE}`;
export const DELETE_SPECIFIC_MESSAGE = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}`;
export const CAN_EXISTING_TEXT_MESSAGE_BE_SENT = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}/canExistingTextMessageBeSent`;
export const GET_PHONE_MESSAGE_LENGTH = (messageId: number, formatId: number) => `${MESSAGE_API_BASE}/${messageId}/${formatId}/length`;
export const UPDATE_MESSAGE_NAME = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}`;
export const UPDATE_MESSAGE_NOTIFICATION_TYPES_AND_NAME = (messageId: number, userSelectedNotificationTypes: number) => `${MESSAGE_API_BASE}/${messageId}/${userSelectedNotificationTypes}`;
export const CANCEL_CALLME_MESSAGE_CREATION = (callMeId: string) => `${MESSAGE_API_BASE}/callme/cancel/${callMeId}`;
export const GET_COUNT_OF_USER_MESSAGES_CREATED = `${MESSAGE_API_BASE}/count`;
export const GET_ALTERNATE_FORMAT_VOICE_MESSAGE = (args: string) => `${ALLOW_ANONYMOUS}${MESSAGE_API_BASE}/playmessage?args=${args}`;
export const SEND_SMS_OPTIN_REQUEST_VIA_EMAIL_TO_GROUP = (groupId: number) => `${MESSAGE_API_BASE}/emailoptin/${groupId}`;
export const SEND_SMS_OPTIN_REQUEST_VIA_TEXT_TO_GROUP = (groupId: number) => `${MESSAGE_API_BASE}/textoptin/${groupId}`;
export const INSERT_OR_UPDATE_MESSAGE_NOTIFICATION_MODEL = (messageId: number) => `${MESSAGE_API_BASE}/upsert/${messageId}`;
export const EDIT_PHONE_OPTIONS = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}/phoneoptions`;
export const EDIT_SMS_TEXT = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}/smstext`;
export const EDIT_EMAIL_OPTIONS = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}/emailtext`;
export const EDIT_SMS_OPTIONS = (messageId: number) => `${MESSAGE_API_BASE}/${messageId}/smsoptions`;
