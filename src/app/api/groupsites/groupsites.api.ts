import { environment } from '../../../environments/environment';
export const ALLOW_ANONYMOUS = `${environment.api.base}`;
export const GROUPSITES_API = `/api/groupsites`;
export const GET_ALL_GROUP_SITES = `${GROUPSITES_API}`;
export const SAVE_GROUP_SITE = `${GROUPSITES_API}`;
export const GET_GROUP_SITE = (groupId: number) => `${GROUPSITES_API}/${groupId}`;
export const UPDATE_GROUP_SITE = (groupId: number) => `${GROUPSITES_API}/${groupId}`;
export const SAVE_GROUP_SITE_ABOUT_US_PAGE = (groupId: number) => `${GROUPSITES_API}/${groupId}/about`;
export const SAVE_GROUP_SITE_ANNOUNCEMENT = (groupId: number) => `${GROUPSITES_API}/${groupId}/announcement`;
export const SAVE_GROUP_SITE_ANNOUNCEMENTS = (groupId: number) => `${GROUPSITES_API}/${groupId}/announcements`;
export const DELETE_GROUP_SITE_ANNOUNCEMENT = (groupId: number, announcementId: number) => `${GROUPSITES_API}/${groupId}/announcements/${announcementId}`;
export const SAVE_GROUP_SITE_CONTACT_INFO = (groupId: number) => `${GROUPSITES_API}/${groupId}/contactInfo`;
export const SAVE_GROUP_SITE_CONTENT_MESSAGE_PAGE = (groupId: number) => `${GROUPSITES_API}/${groupId}/content`;
export const DELETE_GROUP_SITE_AMAZON_MEDIA = (groupId: number) => `${GROUPSITES_API}/${groupId}/deletemedia`;
export const GET_GROUP_SITE_MEDIA = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/getmedia`;
export const GET_GROUP_SITE_MEDIA_COUNT = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/getmediacount`;
export const GET_GROUP_SITE_BYTES_USAGE = (groupId: number) => `${GROUPSITES_API}/${groupId}/getusage`;
export const UPDATE_GROUP_SITE_GIVING = (groupId: number) => `${GROUPSITES_API}/${groupId}/giving`;
export const CHANGE_GROUP_SITE_GIVING_ACTIVE_STATUS = (groupId: number, active: boolean) => `${GROUPSITES_API}/${groupId}/giving/${active}`;
export const SAVE_GROUP_SITE_INFORMATION = (groupId: number) => `${GROUPSITES_API}/${groupId}/information`;
export const SAVE_GROUP_SITE_FOOTER = (groupId: number) => `${GROUPSITES_API}/${groupId}/footer`;
export const SAVE_GROUP_SITE_MAP_AREA = (groupId: number) => `${GROUPSITES_API}/${groupId}/maparea`;
export const GET_PUBLIC_GROUP_WEBSITE_MEDIA = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/media`;
export const SAVE_PUBLIC_GROUP_WEBSITE_MEDIA = (groupId: number) => `${GROUPSITES_API}/${groupId}/media`;
export const DELETE_PUBLIC_GROUP_WEBSITE_MEDIA = (groupId: number, mediaId: number) => `${GROUPSITES_API}/${groupId}/media/${mediaId}`;
export const GET_PUBLIC_GROUP_SITE_MEDIA_AUDIOS = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/media/audio`;
export const GET_PUBLIC_GROUP_SITE_MEDIA_VIDEOS = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/media/videos`;
export const GET_TEMPORARY_GROUP_SITE_IMAGE_PREVIEW = (groupId: number) => `${GROUPSITES_API}/${groupId}/picturepreview`;
export const SAVE_GROUP_SITE_PICTURES = (groupId: number) => `${GROUPSITES_API}/${groupId}/pictures`;
export const DELETE_GROUP_SITE_IMAGE = (groupId: number, imageId: number) => `${GROUPSITES_API}/${groupId}/pictures/${imageId}`;
export const GET_PUBLIC_GROUP_SITE_PHOTO = (groupId: number, imageId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/photo/${imageId}`;
export const SAVE_MEDIA = (groupId: number) => `${GROUPSITES_API}/${groupId}/saveMedia`;
export const UPDATE_SEO = (groupId: number) => `${GROUPSITES_API}/${groupId}/seo`;
export const GET_PUBLIC_GROUP_SITE_STAFF = (groupId: number) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/${groupId}/staff`;
export const SAVE_GROUP_WEBSITE_STAFF = (groupId: number) => `${GROUPSITES_API}/${groupId}/staff`;
export const DELETE_GROUP_WEBSITE_STAFF_MEMBER = (groupId: number, staffMemberId: number) => `${GROUPSITES_API}/${groupId}/staff/${staffMemberId}`;
export const ACTIVATE_GROUP_SITE = (groupId: number, isActive: boolean) => `${GROUPSITES_API}/${groupId}/status/${isActive}`;
export const UPDATE_GROUP_SITE_COLOR_THEME = (groupId: number) => `${GROUPSITES_API}/${groupId}/theme`;
export const CAN_GEO_CODE_ADDRESS = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/cangeocodeaddress`;
export const GET_PUBLIC_GROUP_SITE_BY_SITE_NAME = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/search`;
export const GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/searchByDomainName`;
export const GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME_LOGO_ONLY = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/searchByDomainNamelogoonly`;
export const GET_PUBLIC_GROUP_SITE_BY_SITE_NAME_LOGO_ONLY = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/searchLogoonly`;
export const GET_ALL_GROUP_SITES_BY_GROUP_NAME = (groupName) => `${ALLOW_ANONYMOUS}${GROUPSITES_API}/searchwebsite/${groupName}`;
export const GET_PUBLIC_GROUP_SITE_SEO_BY_DOMAIN_NAME = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/seo/searchbydomainnanme`;
export const GET_PUBLIC_GROUP_SITE_SEO_BY_SITE_NAME = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/seo/searchbysitename`;
export const VERIFY_ZIP_CODE = `${ALLOW_ANONYMOUS}${GROUPSITES_API}/verifyzipcode`;
export const GET_ALL_GROUP_SITES_WEBSITE_NAMES = (pageSize?: number, pageIndex?: number) =>
  `${ALLOW_ANONYMOUS}${GROUPSITES_API}/websitenames?pagesize=${pageSize}&pageindex=${pageIndex}`;