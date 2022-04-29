import { SectionWidgetItem } from '../models/section-widget-item.model';

import { DashboardOverviewType } from '../enums/dashboard-items.enum';

export const MemberOverview: Array<SectionWidgetItem> = [
  {
    icon: 'person',
    primaryText: '',
    secondaryText: 'Members',
    type: DashboardOverviewType.Members,
  },
  {
    icon: 'weekend',
    primaryText: '',
    rotateIcon: true,
    secondaryText: 'Phone Numbers',
    type: DashboardOverviewType.Phones,
  },
  {
    icon: 'email',
    primaryText: '',
    secondaryText: 'Emails',
    type: DashboardOverviewType.Emails,
  },
];
