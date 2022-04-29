import { GroupStats } from 'src/app/api/groups/groups.models';
import { NotificationFormatValues } from '../../models/message/message.models';

export function hasValidEndpoints(
  notificationFormat: NotificationFormatValues,
  groupStats: GroupStats[],
) {
  const hasActivePhones =
    groupStats.reduce((acc, data) => (acc += data.phoneCount), 0) > 0;
  const hasEmails =
    groupStats.reduce((acc, data) => (acc += data.emailCount), 0) > 0;

  switch (notificationFormat) {
    case NotificationFormatValues.VoiceMessage:
    case NotificationFormatValues.TextMessage:
    case NotificationFormatValues.VoiceText:
      return hasActivePhones;
    case NotificationFormatValues.EmailMessage:
    case NotificationFormatValues.VoiceEmail:
      return hasEmails;
    default:
      return hasActivePhones || hasEmails;
  }
}
