import { PublicGroupPageSaveType } from '../shared/shared.enums';

import {
  Announcement, Contact,
  Media,  Picture, VideoLink, WebsiteMedia
} from '../shared/shared.models';

export interface GroupWebSite {
  id: number;
  groupName: string;
  webAddress: string;
  domainName: string;
  isSuspended: boolean;
  pageContent: string;
  aboutPageContentLeft: string;
  aboutPageContentRight: string;
  joinOurListH1Text: string;
  joinOurListButtonText: string;
  showJoinNowButton?: boolean;
  mapAreaOurLocationH1Text: string;
  mapAreaAddressHeaderH1Text: string;
  footerAreaOurLocationContent: string;
  footerAreaContactUsContent: string;
  mapAreaWidgetContent1: string;
  mapAreaWidgetContent2: string;
  mapAreaAddressContent: string;
  hasForum: boolean;
  allowToJoinFromPublicGroupSite: boolean;
  siteColor: string;
  colorStyleSheetNeeded: string;
  displayGetMyOwnWebsite: boolean;
  groupId: number;
  ownerId: number;
  announcements: Announcement[];
  contacts: Contact[];
  pictures: Picture[];
  videoLinks: VideoLink[];
  saveType: PublicGroupPageSaveType;
  welcomeMessage: string;
  aboutSection1Title: string;
  aboutSection2Title: string;
  footerContactUsTitle: string;
  websiteWelcomeMsgTitle: string;
  websiteWelcomeMsgContent: string;
  seoKeywords: string;
  seoDescription: string;
  seoPageTitle: string;
  seoGoogleAnalyticsTrackingId: string;
  seoGoogleWebmasterToolsVerificationId: string;
  seoBingWebmasterVerificationId: string;
  givingIsActive?: boolean;
  givingHeadingOne: string;
  givingHeadingTwo: string;
  givingContent: string;
  givingPageButtonCode: string;
  showStaffPage: boolean;
  referToStaffMenuAs: string;
  showAnnouncementPage: boolean;
}

export interface GroupWebsiteAnnouncement {
  showAnnouncementPage: boolean;
  announcements: Announcement[];
  groupId: number;
}

export interface DeleteObjectResponse {
  deleteMarker: string;
  versionId: string;
}

export interface GroupWebsiteMedia {
  webImages: Media[];
  groupId: number;
}

export interface GroupPublicWebsiteMedia {
  groupId: number;
  websiteMedias: WebsiteMedia[];
}

export interface StaffMember {
  id: number;
  groupId: number;
  imageId: number;
  fullName: string;
  phoneNumber: string;
  jobTitle: string;
  displayOrder: number;
  modifiedByUserId: number;
  staffPicture: Picture;
}

export interface GroupWebsiteStaff {
  showStaffPage: boolean;
  referToStaffMenuAs: string;
  staffMembers: StaffMember[];
  groupId: number;
}

export interface GroupSeo {
  id: number;
  seoKeywords: string;
  seoDescription: string;
  seoPageTitle: string;
  seoGoogleAnalyticsTrackingId: string;
  seoGoogleWebmasterToolsVerificationId: string;
  seoBingWebmasterVerificationId: string;
}

export interface WebsiteName {
  name: string;
}
