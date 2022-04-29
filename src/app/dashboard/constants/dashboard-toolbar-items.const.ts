import { ToolbarItem } from '../models/toolbar-item.model';

import {
  ToolbarActionItem,
  ToolbarActionItemColor,
} from '../enums/dashboard-toolbar.enum';

export const ToolbarItems: Array<ToolbarItem> = [
  {
    icon: 'record_voice_over',
    text: ToolbarActionItem.SendMessage,
    colorScheme: ToolbarActionItemColor.CyanBlueShade,
  },
  {
    icon: 'people',
    text: ToolbarActionItem.GroupsMembers,
    colorScheme: ToolbarActionItemColor.CyanDarkShade,
  },
  {
    icon: 'bar_chart',
    text: ToolbarActionItem.CommunicationResults,
    colorScheme: ToolbarActionItemColor.MediumSlateBlueShade,
  },
  {
    icon: 'library_books',
    text: ToolbarActionItem.MessageLibrary,
    colorScheme: ToolbarActionItemColor.DeepCerise,
  },
];
