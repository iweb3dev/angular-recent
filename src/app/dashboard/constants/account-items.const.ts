import { SectionWidgetItem } from '../models/section-widget-item.model';

import {
  DashboardOverviewType,
  DashboardCommunicationType,
} from '../enums/dashboard-items.enum';

export const AccountOverview: Array<SectionWidgetItem> = [
  {
    icon: '',
    button: '',
    buttonIcon: '',
    primaryText: '',
    secondaryText: '',
    type: DashboardOverviewType.Credits,
  },
  {
    primaryText: '',
    icon: 'watch_later',
    secondaryText: 'Minutes Saved',
    type: DashboardCommunicationType.Minutes,
  },
  {
    primaryText: '',
    icon: 'record_voice_over',
    secondaryText: 'Calls Sent',
    type: DashboardCommunicationType.Calls,
  },
  {
    primaryText: '',
    icon: 'insert_chart',
    secondaryText: 'Texts Sent',
    type: DashboardCommunicationType.Texts,
  },
  {
    primaryText: '',
    icon: 'library_books',
    secondaryText: 'Emails Sent',
    type: DashboardCommunicationType.Emails,
  },
];

export const CALL_IN_NUMBER_SETTING_ID = '49';

export const MOBILE_WINDOW_LIMIT = 959;
export const MOBILE_ACCOUNT_OVERVIEW_ITEMS = 2;
export const DESKTOP_ACCOUNT_OVERVIEW_ITEMS = 8;
