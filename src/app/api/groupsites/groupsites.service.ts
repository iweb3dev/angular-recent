import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '../../core/http/http.service';
import {
  AddressDetail, Announcement, Contact,
  DtoResponse, Media, PagedList, Picture
} from '../shared/shared.models';
import {
    DELETE_GROUP_SITE_AMAZON_MEDIA,
    DELETE_GROUP_SITE_ANNOUNCEMENT,
  GET_ALL_GROUP_SITES,
  GET_GROUP_SITE,
  GET_GROUP_SITE_MEDIA,
  GET_GROUP_SITE_MEDIA_COUNT,
  SAVE_GROUP_SITE,
  SAVE_GROUP_SITE_ABOUT_US_PAGE,
  SAVE_GROUP_SITE_ANNOUNCEMENT,
  SAVE_GROUP_SITE_ANNOUNCEMENTS,
  SAVE_GROUP_SITE_CONTACT_INFO,
  SAVE_GROUP_SITE_CONTENT_MESSAGE_PAGE,
  SAVE_GROUP_SITE_INFORMATION,
  SAVE_GROUP_SITE_FOOTER,
  SAVE_GROUP_SITE_MAP_AREA,
  UPDATE_GROUP_SITE,
  GET_GROUP_SITE_BYTES_USAGE,
  UPDATE_GROUP_SITE_GIVING,
  CHANGE_GROUP_SITE_GIVING_ACTIVE_STATUS,
  GET_PUBLIC_GROUP_WEBSITE_MEDIA,
  SAVE_PUBLIC_GROUP_WEBSITE_MEDIA,
  DELETE_PUBLIC_GROUP_WEBSITE_MEDIA,
  GET_PUBLIC_GROUP_SITE_MEDIA_AUDIOS,
  GET_PUBLIC_GROUP_SITE_MEDIA_VIDEOS,
  GET_TEMPORARY_GROUP_SITE_IMAGE_PREVIEW,
  SAVE_GROUP_SITE_PICTURES,
  DELETE_GROUP_SITE_IMAGE,
  GET_PUBLIC_GROUP_SITE_PHOTO,
  SAVE_MEDIA,
  UPDATE_SEO,
  GET_PUBLIC_GROUP_SITE_STAFF,
  SAVE_GROUP_WEBSITE_STAFF,
  DELETE_GROUP_WEBSITE_STAFF_MEMBER,
  ACTIVATE_GROUP_SITE,
  UPDATE_GROUP_SITE_COLOR_THEME,
  CAN_GEO_CODE_ADDRESS,
  GET_PUBLIC_GROUP_SITE_BY_SITE_NAME,
  GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME,
  GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME_LOGO_ONLY,
  GET_PUBLIC_GROUP_SITE_BY_SITE_NAME_LOGO_ONLY,
  GET_ALL_GROUP_SITES_BY_GROUP_NAME,
  GET_PUBLIC_GROUP_SITE_SEO_BY_DOMAIN_NAME,
  GET_PUBLIC_GROUP_SITE_SEO_BY_SITE_NAME,
  GET_ALL_GROUP_SITES_WEBSITE_NAMES,
  VERIFY_ZIP_CODE,
} from './groupsites.api';
import {
  DeleteObjectResponse, GroupPublicWebsiteMedia, GroupSeo, GroupWebSite,
  GroupWebsiteAnnouncement, GroupWebsiteMedia, GroupWebsiteStaff, WebsiteName
} from './groupsites.models';

@Injectable({
  providedIn: 'root',
})

export class GroupSitesServices {
  constructor(private _http: Http, private _httpClient: HttpClient) {}

  getAllGroupSites(): Observable<GroupWebSite[]> {
    return this._http
      .get<GroupWebSite[]>(GET_ALL_GROUP_SITES);
  }

  saveGroupSite(groupWebSiteDetails: GroupWebSite): Observable<number> {
    return this._http
      .post<number>(SAVE_GROUP_SITE, groupWebSiteDetails);
  }

  getSiteService(groupId: number): Observable<GroupWebSite> {
    return this._http
      .get<GroupWebSite>(GET_GROUP_SITE(groupId));
  }

  updateGroupSite(groupId: number, groupSite: GroupWebSite): Observable<object> {
    return this._http
      .put<object>(UPDATE_GROUP_SITE(groupId), groupSite);
  }

  saveGroupSiteAboutUsPage(groupId: number, groupSite: GroupWebSite): Observable<object> {
    return this._http
      .post<object>(SAVE_GROUP_SITE_ABOUT_US_PAGE(groupId), groupSite);
  }

  saveGroupSiteAnnouncement(groupId: number, newsInfo: Announcement) {
    return this._http
      .post<object>(SAVE_GROUP_SITE_ANNOUNCEMENT(groupId), newsInfo);
  }

  saveGroupSiteAnnouncements(groupId: number, websiteAnnouncement: GroupWebsiteAnnouncement) {
    return this._http
      .post<object>(SAVE_GROUP_SITE_ANNOUNCEMENTS(groupId), websiteAnnouncement);
  }

  deleteGroupSiteAnnouncement(groupId: number, announcementId: number): Observable<object> {
    return this._http
      .delete(DELETE_GROUP_SITE_ANNOUNCEMENT(groupId, announcementId));
  }

  saveGroupSiteContact(groupId: number, contactInfo: Contact): Observable<object> {
    return this._http
      .post<object>(SAVE_GROUP_SITE_CONTACT_INFO(groupId), contactInfo);
  }

  saveGroupSiteContentMessagePage(groupId: number, groupSite: GroupWebSite) {
    return this._http
      .post<object>(SAVE_GROUP_SITE_CONTENT_MESSAGE_PAGE(groupId), groupSite);
  }

  deleteGroupSiteAmazonMedia(groupId: number, media: Media): Observable<DtoResponse<DeleteObjectResponse>> {
    return this._http
      .post<DtoResponse<DeleteObjectResponse>>(DELETE_GROUP_SITE_AMAZON_MEDIA(groupId), media);
  }

  getGroupSiteMedia(groupId: number): Observable<GroupWebsiteMedia> {
    return this._httpClient
      .get<GroupWebsiteMedia>(GET_GROUP_SITE_MEDIA(groupId));
  }

  getGroupSiteMediaCount(groupId: number): Observable<number> {
    return this._httpClient
      .get<number>(GET_GROUP_SITE_MEDIA_COUNT(groupId));
  }

  getGroupSiteBytesUsage(groupId: number): Observable<DtoResponse<number>> {
    return this._http
      .get<DtoResponse<number>>(GET_GROUP_SITE_BYTES_USAGE(groupId));
  }

  updateGroupSiteGiving(groupId: number, groupSite: GroupWebSite) {
    return this._http
      .put<object>(UPDATE_GROUP_SITE_GIVING(groupId), groupSite);
  }

  changeGroupSiteGivingActiveStatus(groupId: number, active: boolean): Observable<object> {
    return this._http
      .put<object>(CHANGE_GROUP_SITE_GIVING_ACTIVE_STATUS(groupId, active), null);
  }

  saveGroupSiteInformation(groupId: number, groupSite: GroupWebSite) {
    return this._http
    .put<object>(SAVE_GROUP_SITE_INFORMATION(groupId), groupSite);
  }

  saveGroupSiteFooter(groupId: number, groupSite: GroupWebSite) {
    return this._http
      .post<object>(SAVE_GROUP_SITE_FOOTER(groupId), groupSite);
  }

  saveGroupSiteMapArea(groupId: number, groupSite: GroupWebSite): Observable<object> {
    return this._http
      .post<object>(SAVE_GROUP_SITE_MAP_AREA(groupId), groupSite);
  }

  getPublicGroupWebsiteMedia(groupId: number): Observable<GroupPublicWebsiteMedia> {
    return this._httpClient
      .get<GroupPublicWebsiteMedia>(GET_PUBLIC_GROUP_WEBSITE_MEDIA(groupId));
  }

  savePublicGroupWebsiteMedia(groupId: number, publicWebsiteMedia: GroupPublicWebsiteMedia): Observable<object> {
    return this._http
      .post<object>(SAVE_PUBLIC_GROUP_WEBSITE_MEDIA(groupId), publicWebsiteMedia);
  }

  deletePublicGroupWebsiteMedia(groupId: number, mediaId: number): Observable<object> {
    return this._http
      .delete(DELETE_PUBLIC_GROUP_WEBSITE_MEDIA(groupId, mediaId));
  }

  getPublicGroupSiteMediaAudios(groupId: number): Observable<GroupPublicWebsiteMedia> {
    return this._httpClient
      .get<GroupPublicWebsiteMedia>(GET_PUBLIC_GROUP_SITE_MEDIA_AUDIOS(groupId));
  }

  getPublicGroupSiteMediaVideos(groupId: number): Observable<GroupPublicWebsiteMedia> {
    return this._httpClient
      .get<GroupPublicWebsiteMedia>(GET_PUBLIC_GROUP_SITE_MEDIA_VIDEOS(groupId));
  }

  getTemporaryGroupSiteImagePreview(groupId: number, picture: Picture): Observable<Picture> {
    return this._http
      .post<Picture>(GET_TEMPORARY_GROUP_SITE_IMAGE_PREVIEW(groupId), picture);
  }

  saveGroupSitePictures(groupId: number, pictures: Picture[]): Observable<object> {
    return this._http
      .post<object>(SAVE_GROUP_SITE_PICTURES(groupId), pictures);
  }

  deleteGroupSiteImage(groupId: number, imageId: number) {

    return this._http
      .delete(DELETE_GROUP_SITE_IMAGE(groupId, imageId));
  }

  getPublicGroupSitePhoto(groupId: number, imageId: number): Observable<Picture> {
    return this._httpClient
      .get<Picture>(GET_PUBLIC_GROUP_SITE_PHOTO(groupId, imageId));
  }

  saveMedia(groupId: number, media: GroupWebsiteMedia): Observable<boolean> {
    return this._http
      .post<boolean>(SAVE_MEDIA(groupId), media);
  }

  updateSeo(groupId: number, groupSite: GroupWebSite): Observable<object> {
    return this._http
      .put<object>(UPDATE_SEO(groupId), groupSite);
  }

  getPublicGroupSiteStaff(groupId: number): Observable<GroupWebsiteStaff> {
    return this._httpClient
      .get<GroupWebsiteStaff>(GET_PUBLIC_GROUP_SITE_STAFF(groupId));
  }

  saveGroupWebsiteStaff(groupId: number, websiteStaff: GroupWebsiteStaff): Observable<object> {
    return this._http
      .post<object>(SAVE_GROUP_WEBSITE_STAFF(groupId), websiteStaff);
  }

  deleteGroupWebsiteStaffMember(groupId: number, staffMemberId: number): Observable<object> {
    return this._http
      .delete(DELETE_GROUP_WEBSITE_STAFF_MEMBER(groupId, staffMemberId));
  }

  activateGroupSite(groupId: number, isActive: boolean): Observable<object> {
    return this._http
      .put<object>(ACTIVATE_GROUP_SITE(groupId, isActive), null);
  }

  updateGroupSiteColorTheme(groupId: number, siteColor: string): Observable<object> {
    return this._http
      .put<object>(UPDATE_GROUP_SITE_COLOR_THEME(groupId), siteColor);
  }

  canGeoCodeAddress(address: AddressDetail): Observable<boolean> {
    return this._httpClient
      .post<boolean>(CAN_GEO_CODE_ADDRESS, address);
  }

  getPublicGroupSiteBySiteName(groupWebSiteSearch: GroupWebSite): Observable<GroupWebSite> {
    return this._httpClient
      .post<GroupWebSite>(GET_PUBLIC_GROUP_SITE_BY_SITE_NAME, groupWebSiteSearch);
  }

  getPublicGroupSiteByDomainName(getWebSiteSearch: GroupWebSite): Observable<GroupWebSite>  {
    return this._httpClient
      .post<GroupWebSite>(GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME, getWebSiteSearch);
  }

  getPublicGroupSiteByDomainNameLogoOnly(groupWebSiteSearch: GroupWebSite): Observable<GroupWebSite>  {
    return this._httpClient
      .post<GroupWebSite>(GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME_LOGO_ONLY, groupWebSiteSearch);
  }

  getPublicGroupSiteBySiteNameLogoOnly(getWebSiteSearch: GroupWebSite): Observable<GroupWebSite>  {
    return this._httpClient
      .post<GroupWebSite>(GET_PUBLIC_GROUP_SITE_BY_SITE_NAME_LOGO_ONLY, getWebSiteSearch);
  }

  getAllGroupSiteByGroupName(groupName: string): Observable<GroupWebSite[]> {
    return this._httpClient
      .get<GroupWebSite[]>(GET_ALL_GROUP_SITES_BY_GROUP_NAME(groupName));
  }

  getPublicGroupSiteSeoByDomainName(getWebSiteSearch: GroupWebSite): Observable<GroupSeo> {
    return this._httpClient
      .post<GroupSeo>(GET_PUBLIC_GROUP_SITE_SEO_BY_DOMAIN_NAME, getWebSiteSearch);
  }

  getPublicGroupSeoBySiteName(getWebSiteSearch: GroupWebSite): Observable<GroupSeo>  {
    return this._httpClient
      .post<GroupSeo>(GET_PUBLIC_GROUP_SITE_SEO_BY_SITE_NAME, getWebSiteSearch);
  }

  verifyZipCode(zipCode: string): Observable<AddressDetail> {
    return this._httpClient
      .post<AddressDetail>(VERIFY_ZIP_CODE, zipCode);
  }

  getAllGroupSitesByWebSiteName(pageSize?: number, pageIndex?: number): Observable<PagedList<WebsiteName>> {
    return this._httpClient
      .get<PagedList<WebsiteName>>(GET_ALL_GROUP_SITES_WEBSITE_NAMES(pageSize, pageIndex));
  }
}
