import { RouteNames } from '../shared/models/enums/route-names';
import { MenuModel } from './navigation.models';

export const MENU_ITEMS_TOP: MenuModel[] = [
  {
    icon: 'dashboard',
    title: RouteNames.Dashboard,
    to: '/dashboard',
    hideMenuItem: false,
  },
  {
    icon: 'schedule_send',
    title: RouteNames.SendMessage,
    // to: '/schedule-message',
    to: '/new-communication',
    hideMenuItem: false,
  },
  {
    icon: 'groups',
    title: RouteNames.Groups,
    to: '/groups',
    hideMenuItem: false,
  },
  {
    icon: 'assessment',
    title: RouteNames.MessageResults,
    to: '/message-results',
    hideMenuItem: false,
  },
  {
    icon: 'perm_phone_msg',
    title: RouteNames.MessageLibrary,
    to: '/messages',
    hideMenuItem: false,
  },
];

export const MENU_ITEMS_MIDDLE: MenuModel[] = [
  {
    icon: 'vpn_key',
    title: RouteNames.Keywords,
    to: '/keywords',
    hideMenuItem: false,
  },
  {
    icon: 'phone_in_talk',
    title: RouteNames.RecurringMessage,
    to: '/call-in-settings',
    hideMenuItem: true,
  },
  {
    icon: 'settings_phone',
    title: RouteNames.CustomPhone,
    to: '/custom-phone-numbers',
    hideMenuItem: false,
  },
  {
    icon: 'event',
    title: RouteNames.Reminders,
    to: '/reminders',
    hideMenuItem: false,
  },
];

export const MENU_ITEMS_BOTTOM: MenuModel[] = [
  {
    icon: 'logout',
    title: RouteNames.Logout,
    to: '/logout',
    hideMenuItem: false,
  },
];

export const MENU_ITEMS_HELP: MenuModel[] = [
  {
    icon: 'support_agent',
    title: RouteNames.HelpCenter,
    hideMenuItem: false,
  },
];

export const MENU_ITEMS_SWITCH: MenuModel[] = [
  {
    icon: 'compare_arrows',
    title: RouteNames.SwitchAccount,
    hideMenuItem: false,
  },
];

export const MENU_ITEMS_INFO: MenuModel[] = [
  {
    icon: 'emoji_events',
    title: RouteNames.Rewards,
    to: '/rewards',
    hideMenuItem: false,
  },
  {
    icon: 'monetization_on',
    title: RouteNames.InformationFifty,
    to: '/rewards/refer',
    hideMenuItem: false,
  },
];

export const USER_MENU_ITEMS = [
  {
    icon: 'account_box',
    title: RouteNames.User,
    to: '/user',
    hideMenuItem: false,
  },
  {
    icon: 'shopping_cart',
    title: RouteNames.BillingPlan,
    to: '/billing',
    hideMenuItem: false,
  },
  {
    icon: 'phone_in_talk',
    title: RouteNames.CallInSettings,
    to: '/call-in-settings',
    hideMenuItem: false,
  },
  {
    icon: 'settings',
    title: RouteNames.System,
    to: '/system-settings',
    hideMenuItem: false,
  },
  {
    icon: 'switch_account',
    title: RouteNames.GroupManagers,
    to: '/group-managers',
    hideMenuItem: false,
  },
  {
    icon: 'lock',
    title: RouteNames.PasswordLogin,
    to: '/password-login',
    hideMenuItem: false,
  },
  {
    icon: 'compare_arrows',
    title: RouteNames.SwitchAccount,
    hideMenuItem: false,
  },
  {
    icon: 'logout',
    title: RouteNames.Logout,
    to: '/logout',
    hideMenuItem: false,
  },
];

export const USER_MENU_ITEMS_M = [
  {
    icon: 'account_box',
    title: RouteNames.User,
    to: '/user',
    hideMenuItem: false,
  },
  {
    icon: 'shopping_cart',
    title: RouteNames.BillingPlan,
    to: '/billing',
    hideMenuItem: false,
  },
  {
    icon: 'phone_in_talk',
    title: RouteNames.CallInSettings,
    to: '/call-in-settings',
    hideMenuItem: false,
  },
  {
    icon: 'settings',
    title: RouteNames.System,
    to: '/system-settings',
    hideMenuItem: false,
  },
  {
    icon: 'switch_account',
    title: RouteNames.GroupManagers,
    to: '/group-managers',
    hideMenuItem: false,
  },
  {
    icon: 'lock',
    title: RouteNames.PasswordLogin,
    to: '/password-login',
    hideMenuItem: false,
  },
  {
    icon: 'compare_arrows',
    title: RouteNames.SwitchAccount,
    hideMenuItem: false,
  },
];
