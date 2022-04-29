import { NotificationFormatValues } from '../../models/message/message.models';

export const hasPhoneFormat = (
  notificationFormatValue: NotificationFormatValues,
): boolean =>
  notificationFormatValue === NotificationFormatValues.AllMessages ||
  notificationFormatValue === NotificationFormatValues.VoiceEmail ||
  notificationFormatValue === NotificationFormatValues.VoiceText ||
  notificationFormatValue === NotificationFormatValues.VoiceMessage;

export const hasTextFormat = (
  notificationFormatValue: NotificationFormatValues,
): boolean =>
  notificationFormatValue === NotificationFormatValues.AllMessages ||
  notificationFormatValue === NotificationFormatValues.VoiceText ||
  notificationFormatValue === NotificationFormatValues.TextEmail ||
  notificationFormatValue === NotificationFormatValues.TextMessage;

export const hasEmailFormat = (
  notificationFormatValue: NotificationFormatValues,
): boolean =>
  notificationFormatValue === NotificationFormatValues.AllMessages ||
  notificationFormatValue === NotificationFormatValues.EmailMessage ||
  notificationFormatValue === NotificationFormatValues.VoiceEmail ||
  notificationFormatValue === NotificationFormatValues.TextEmail;

export const createVoiceFormatMap = () =>
  new Map([
    [
      NotificationFormatValues.AllMessages,
      NotificationFormatValues.AllMessages,
    ],
    [NotificationFormatValues.VoiceText, NotificationFormatValues.VoiceText],
    [NotificationFormatValues.VoiceEmail, NotificationFormatValues.VoiceEmail],
    [
      NotificationFormatValues.VoiceMessage,
      NotificationFormatValues.VoiceMessage,
    ],
  ]);

export const createTextFormatMap = () =>
  new Map([
    [
      NotificationFormatValues.AllMessages,
      NotificationFormatValues.AllMessages,
    ],
    [NotificationFormatValues.VoiceText, NotificationFormatValues.VoiceText],
    [NotificationFormatValues.TextEmail, NotificationFormatValues.TextEmail],
    [
      NotificationFormatValues.TextMessage,
      NotificationFormatValues.TextMessage,
    ],
  ]);

export const createEmailFormatsMap = () =>
  new Map([
    [
      NotificationFormatValues.AllMessages,
      NotificationFormatValues.AllMessages,
    ],
    [
      NotificationFormatValues.EmailMessage,
      NotificationFormatValues.EmailMessage,
    ],
    [NotificationFormatValues.VoiceEmail, NotificationFormatValues.VoiceEmail],
    [NotificationFormatValues.TextEmail, NotificationFormatValues.TextEmail],
  ]);

