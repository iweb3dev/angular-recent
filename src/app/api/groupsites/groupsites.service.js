"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSitesServices = void 0;
var core_1 = require("@angular/core");
var groupsites_api_1 = require("./groupsites.api");
var GroupSitesServices = /** @class */ (function () {
    function GroupSitesServices(_http, __http) {
        this._http = _http;
        this.__http = __http;
    }
    GroupSitesServices.prototype.getAllGroupSites = function () {
        return this._http
            .get(groupsites_api_1.GET_ALL_GROUP_SITES);
    };
    GroupSitesServices.prototype.saveGroupSite = function (groupWebSiteDetails) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE, groupWebSiteDetails);
    };
    GroupSitesServices.prototype.getSiteService = function (groupId) {
        return this._http
            .get(groupsites_api_1.GET_GROUP_SITE(groupId));
    };
    GroupSitesServices.prototype.updateGroupSite = function (groupId, groupSite) {
        return this._http
            .put(groupsites_api_1.UPDATE_GROUP_SITE(groupId), groupSite);
    };
    GroupSitesServices.prototype.saveGroupSiteAboutUsPage = function (groupId, groupSite) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_ABOUT_US_PAGE(groupId), groupSite);
    };
    GroupSitesServices.prototype.saveGroupSiteAnnouncement = function (groupId, newsInfo) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_ANNOUNCEMENT(groupId), newsInfo);
    };
    GroupSitesServices.prototype.saveGroupSiteAnnouncements = function (groupId, websiteAnnouncement) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_ANNOUNCEMENTS(groupId), websiteAnnouncement);
    };
    GroupSitesServices.prototype.deleteGroupSiteAnnouncement = function (groupId, announcementId) {
        return this._http
            .delete(groupsites_api_1.DELETE_GROUP_SITE_ANNOUNCEMENT(groupId, announcementId));
    };
    GroupSitesServices.prototype.saveGroupSiteContact = function (groupId, contactInfo) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_CONTACT_INFO(groupId), contactInfo);
    };
    GroupSitesServices.prototype.saveGroupSiteContentMessagePage = function (groupId, groupSite) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_CONTENT_MESSAGE_PAGE(groupId), groupSite);
    };
    GroupSitesServices.prototype.deleteGroupSiteAmazonMedia = function (groupId, media) {
        return this._http
            .post(groupsites_api_1.DELETE_GROUP_SITE_AMAZON_MEDIA(groupId), media);
    };
    GroupSitesServices.prototype.getGroupSiteMedia = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_GROUP_SITE_MEDIA(groupId));
    };
    GroupSitesServices.prototype.getGroupSiteMediaCount = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_GROUP_SITE_MEDIA_COUNT(groupId));
    };
    GroupSitesServices.prototype.getGroupSiteBytesUsage = function (groupId) {
        return this._http
            .get(groupsites_api_1.GET_GROUP_SITE_BYTES_USAGE(groupId));
    };
    GroupSitesServices.prototype.updateGroupSiteGiving = function (groupId, groupSite) {
        return this._http
            .put(groupsites_api_1.UPDATE_GROUP_SITE_GIVING(groupId), groupSite);
    };
    GroupSitesServices.prototype.changeGroupSiteGivingActiveStatus = function (groupId, active) {
        return this._http
            .put(groupsites_api_1.CHANGE_GROUP_SITE_GIVING_ACTIVE_STATUS(groupId, active), null);
    };
    GroupSitesServices.prototype.saveGroupSiteInformation = function (groupId, groupSite) {
        return this._http
            .put(groupsites_api_1.SAVE_GROUP_SITE_INFORMATION(groupId), groupSite);
    };
    GroupSitesServices.prototype.saveGroupSiteFooter = function (groupId, groupSite) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_FOOTER(groupId), groupSite);
    };
    GroupSitesServices.prototype.saveGroupSiteMapArea = function (groupId, groupSite) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_MAP_AREA(groupId), groupSite);
    };
    GroupSitesServices.prototype.getPublicGroupWebsiteMedia = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_PUBLIC_GROUP_WEBSITE_MEDIA(groupId));
    };
    GroupSitesServices.prototype.savePublicGroupWebsiteMedia = function (groupId, publicWebsiteMedia) {
        return this._http
            .post(groupsites_api_1.SAVE_PUBLIC_GROUP_WEBSITE_MEDIA(groupId), publicWebsiteMedia);
    };
    GroupSitesServices.prototype.deletePublicGroupWebsiteMedia = function (groupId, mediaId) {
        return this._http
            .delete(groupsites_api_1.DELETE_PUBLIC_GROUP_WEBSITE_MEDIA(groupId, mediaId));
    };
    GroupSitesServices.prototype.getPublicGroupSiteMediaAudios = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_PUBLIC_GROUP_SITE_MEDIA_AUDIOS(groupId));
    };
    GroupSitesServices.prototype.getPublicGroupSiteMediaVideos = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_PUBLIC_GROUP_SITE_MEDIA_VIDEOS(groupId));
    };
    GroupSitesServices.prototype.getTemporaryGroupSiteImagePreview = function (groupId, picture) {
        return this._http
            .post(groupsites_api_1.GET_TEMPORARY_GROUP_SITE_IMAGE_PREVIEW(groupId), picture);
    };
    GroupSitesServices.prototype.saveGroupSitePictures = function (groupId, pictures) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_SITE_PICTURES(groupId), pictures);
    };
    GroupSitesServices.prototype.deleteGroupSiteImage = function (groupId, imageId) {
        return this._http
            .delete(groupsites_api_1.DELETE_GROUP_SITE_IMAGE(groupId, imageId));
    };
    GroupSitesServices.prototype.getPublicGroupSitePhoto = function (groupId, imageId) {
        return this.__http
            .get(groupsites_api_1.GET_PUBLIC_GROUP_SITE_PHOTO(groupId, imageId));
    };
    GroupSitesServices.prototype.saveMedia = function (groupId, media) {
        return this._http
            .post(groupsites_api_1.SAVE_MEDIA(groupId), media);
    };
    GroupSitesServices.prototype.updateSeo = function (groupId, groupSite) {
        return this._http
            .put(groupsites_api_1.UPDATE_SEO(groupId), groupSite);
    };
    GroupSitesServices.prototype.getPublicGroupSiteStaff = function (groupId) {
        return this.__http
            .get(groupsites_api_1.GET_PUBLIC_GROUP_SITE_STAFF(groupId));
    };
    GroupSitesServices.prototype.saveGroupWebsiteStaff = function (groupId, websiteStaff) {
        return this._http
            .post(groupsites_api_1.SAVE_GROUP_WEBSITE_STAFF(groupId), websiteStaff);
    };
    GroupSitesServices.prototype.deleteGroupWebsiteStaffMember = function (groupId, staffMemberId) {
        return this._http
            .delete(groupsites_api_1.DELETE_GROUP_WEBSITE_STAFF_MEMBER(groupId, staffMemberId));
    };
    GroupSitesServices.prototype.activateGroupSite = function (groupId, isActive) {
        return this._http
            .put(groupsites_api_1.ACTIVATE_GROUP_SITE(groupId, isActive), null);
    };
    GroupSitesServices.prototype.updateGroupSiteColorTheme = function (groupId, siteColor) {
        return this._http
            .put(groupsites_api_1.UPDATE_GROUP_SITE_COLOR_THEME(groupId), siteColor);
    };
    GroupSitesServices.prototype.canGeoCodeAddress = function (address) {
        return this.__http
            .post(groupsites_api_1.CAN_GEO_CODE_ADDRESS, address);
    };
    GroupSitesServices.prototype.getPublicGroupSiteBySiteName = function (groupWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_BY_SITE_NAME, groupWebSiteSearch);
    };
    GroupSitesServices.prototype.getPublicGroupSiteByDomainName = function (getWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME, getWebSiteSearch);
    };
    GroupSitesServices.prototype.getPublicGroupSiteByDomainNameLogoOnly = function (groupWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_BY_DOMAIN_NAME_LOGO_ONLY, groupWebSiteSearch);
    };
    GroupSitesServices.prototype.getPublicGroupSiteBySiteNameLogoOnly = function (getWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_BY_SITE_NAME_LOGO_ONLY, getWebSiteSearch);
    };
    GroupSitesServices.prototype.getAllGroupSiteByGroupName = function (groupName) {
        return this.__http
            .get(groupsites_api_1.GET_ALL_GROUP_SITES_BY_GROUP_NAME(groupName));
    };
    GroupSitesServices.prototype.getPublicGroupSiteSeoByDomainName = function (getWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_SEO_BY_DOMAIN_NAME, getWebSiteSearch);
    };
    GroupSitesServices.prototype.getPublicGroupSeoBySiteName = function (getWebSiteSearch) {
        return this.__http
            .post(groupsites_api_1.GET_PUBLIC_GROUP_SITE_SEO_BY_SITE_NAME, getWebSiteSearch);
    };
    GroupSitesServices.prototype.verifyZipCode = function (zipCode) {
        return this.__http
            .post(groupsites_api_1.VERIFY_ZIP_CODE, zipCode);
    };
    GroupSitesServices.prototype.getAllGroupSitesByWebSiteName = function (pageSize, pageIndex) {
        return this.__http
            .get(groupsites_api_1.GET_ALL_GROUP_SITES_WEBSITE_NAMES(pageSize, pageIndex));
    };
    GroupSitesServices = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], GroupSitesServices);
    return GroupSitesServices;
}());
exports.GroupSitesServices = GroupSitesServices;
//# sourceMappingURL=groupsites.service.js.map