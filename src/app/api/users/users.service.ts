import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Http } from 'src/app/core/http/http.service';
import { UserAddress } from 'src/app/core/store/features/user-address/user-address.model';
import { UserEmail } from 'src/app/core/store/features/user-email/user-email.model';
import {
  UserPhone,
  UserPhoneVerification,
  UserPhoneVerificationWithPin,
} from 'src/app/core/store/features/user-phones/user-phones.model';
import { nonValue } from 'src/app/shared/utils/verifications/value-check';
import {
  DELETE_USER_ADDRESS,
  DELETE_USER_EMAIL,
  DELETE_USER_PHONE,
  SAVE_USER_PROFILE,
  SHARE_CALLINGPOST,
  PUBLIC_SHARE_CALLINGPOST,
  UPDATE_USER_ADDRESS,
  UPDATE_USER_EMAIL,
  USER_ADDRESSES_ENDPOINT,
  USER_EMAIL_ENDPOINT,
  USER_ENDPOINT,
  USER_PHONE_ENDPOINT,
  GET_USER_PHONENUMBER,
  UPDATE_USER_PHONENUMBER,
  UPDATE_USER_ADDITIONAL_ORG_INFO,
  GET_USER_BY_USERNAME,
  GET_USER_BY_EMAILADDRESS,
  GET_USER_PROFILE_DATETIME,
  GET_USER_ACCOUNT_STATISTICS,
  GET_ACCOUNT_OWNER_BY_REQUESTID,
  GET_USER_SURVEY_STATUS,
  SAVE_USER_SURVEY,
  UPDATE_USER_PROFILE,
  GET_USERNAME_BY_EMAILADDRESS,
  GET_HAS_SEEN_GUIDE, SAVE_HAS_SEEN_GUIDE,
  GET_USER_SYSTEM_SETTING_VALUE,
  CHANGE_USER_PASSWORD, RESET_USER_PASSWORD,
  UPDATE_TRIAL_ACCOUNT_STATUS,
  CHECK_ACCOUNT_VERIFICATION,
  RESEND_ACCOUNT_VERIFICATION,
  SEND_CONTACT_US_EMAIL,
  GET_USER_SPECIFIC_EMAIL_ADDRESS,
  CREATE_SUBACCOUNT_USER_INVITATION,
  UPDATE_SUBACCOUNT_USER_INVITATION,
  MANAGE_SUBACCOUNT_INVITATION,
  DELETE_SUBACCOUNT_USER,
  REGISTER_SUBACCOUNT_USER,
  CHECK_DATETIME_IN_USER_TIMEZONE,
  GET_SOCIAL_LINK,
  GET_LOGIN_TYPE,
  UPDATE_USER_PHONENUMBER_VALIDATE,
  GET_CALLFORWARD_PHONENUMBER,
  UPDATE_CALLFORWARD_PHONENUMBER,
  INSERT_USER_PHONENUMBER,
  GET_PHONENUMBERS_PURCHASED,
  CHECK_PHONENUMBER_AVAILABLE,
  VALIDATE_PHONE_NUMBER,
  VERIFY_PHONENUMBER,
  VERIFY_PHONENUMBER_ANONYMOUS,
  VERIFY_PHONENUMBER_PIN,
  GET_PHONENUMBER_VERIFICATION_STATUS,
  VERIFY_SMS_PIN_VALID_NO_PIN,
  VERIFY_SMS_PIN_VALID_WITH_PIN,
  VERIFY_PHONE_VENDOR,
  VERIFY_VENDOR_PIN,
  GET_ACCOUNTS_MANAGED_BY_MANAGERUSERID,
  GET_USERS_I_MANAGE,
  GET_USERS_I_MANAGE_WITH_GROUPS,
  SAVE_USER_SYSTEM_SETTING_VALUE,
  SAVE_USER_SYSTEM_SETTINGS,
  GET_USER_SYSTEM_SETTINGS,
} from './users.api';

import { USER_DATA_IGNORE_PROPS } from './users.constants';
import {
  PasswordResetResult,
  PhoneVerificationStatuses,
} from '../shared/shared.enums';
import {
  AdditionalOrgInfo,
  UserModel,
  UserModelDto,
  GetUserByUserName,
  UserSurvey,
  RequestUpdateUserProfile,
  ResponseUpdateUserProfile,
  RequestGetUserNameByEmailAddress,
  ResponseUserSystemSettings,
  ResponseSuccessResult,
  RequestUserSettingsValueSave,
  RequestChangePassword,
  RequestResetPassword,
  RequestTrialStatusCodeId,
  RequestReferralInfo,
  RequestVerifyAccount,
  RequestSystemEmail,
  EmailAddressDetail,
  RequestSubAccountUserUserGroupRoles,
  SubAccountUser,
  PhoneNumber,
  ResponseCallForward,
  BoughtPhoneNumber,
  ResponseUserProfileDateTime,
  ResponseAccountQuickViewStats,
  ResponseAccountUserManage,
  ResponseUsersIManage,
  ResponseUsersIManageGroupDisplay
} from './users.models';
import { DateAndTimeSettings } from '../shared/shared.models';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private _http: Http, private _httpClient: HttpClient, ) {}

  fetchUser(): Observable<UserModel> {
    return this._http
      .get<UserModelDto>(USER_ENDPOINT)
      .pipe(map((r) => this.mapUserResponse(r)));
  }

  saveUserProfile(
    userDTO: MainUserInfoModel,
  ): Observable<ResponseUpdateUserProfile> {
    return this._http.post<ResponseUpdateUserProfile>(
      SAVE_USER_PROFILE(userDTO.id),
      userDTO,
    );
  }

  getUserEmailAddesses(): Observable<[EmailAddressDetail]> {
    return this._http.get<[EmailAddressDetail]>(USER_EMAIL_ENDPOINT);
  }

  getUserSpecificEmailAddress(
    emailAddressId: number,
  ): Observable<EmailAddressDetail> {
    return this._http.get<EmailAddressDetail>(
      GET_USER_SPECIFIC_EMAIL_ADDRESS(emailAddressId),
    );
  }

  createUserEmail(userEmail: UserEmail):
    Observable<number> {
    return this._http
      .post<number>(USER_EMAIL_ENDPOINT, userEmail);
  }

  getUserPhoneNumbers(): Observable<[PhoneNumber]> {
    return this._http.get<[PhoneNumber]>(USER_PHONE_ENDPOINT);
  }

  createUserPhone(userPhone: UserPhone):
    Observable<number> {
    return this._http
      .post<number>(USER_PHONE_ENDPOINT, userPhone);
  }

  getUserPhoneNumber(phoneNumberId: number): Observable<PhoneNumber> {
    return this._http.get<PhoneNumber>(GET_USER_PHONENUMBER(phoneNumberId));
  }

  updateUserPhoneNumber(
    phoneNumber: PhoneNumber,
    phoneNumberId: number,
  ): Observable<PhoneNumber> {
    return this._http.put<PhoneNumber>(
      UPDATE_USER_PHONENUMBER(phoneNumberId),
      phoneNumber,
    );
  }

  updateUserPhoneNumberWithValidation(
    phoneNumber: PhoneNumber,
    phoneNumberId: number,
    fistValidation: boolean,
  ): Observable<PhoneNumber> {
    return this._http.put<PhoneNumber>(
      UPDATE_USER_PHONENUMBER_VALIDATE(phoneNumberId, fistValidation),
      phoneNumber,
    );
  }

  getUserAddresses(): Observable<UserModelDto['addresses']> {
    return this._http.get<UserModelDto['addresses']>(USER_ADDRESSES_ENDPOINT);
  }

  createUserAddress(userAddress: UserAddress):
    Observable<number> {
    return this._http
      .post<number>(USER_ADDRESSES_ENDPOINT, userAddress);
  }

  updateUserEmail(userEmail: UserEmail):
    Observable<boolean> {
    return this._http
      .put<boolean>(UPDATE_USER_EMAIL(userEmail.id), userEmail);
  }

  getUserByEmailAddress(emailAddress: string): Observable<GetUserByUserName> {
    return this._httpClient.get<GetUserByUserName>(
      GET_USER_BY_EMAILADDRESS(emailAddress),
    );
  }

  getUserNameByEmailAddress(
    getUserNameByEmailAddess: RequestGetUserNameByEmailAddress):
    Observable<boolean> {
    return this._httpClient.put<boolean>(GET_USERNAME_BY_EMAILADDRESS, getUserNameByEmailAddess);
  }

  updateUserPhone(userPhone: UserPhone): Observable<boolean> {
    return this._http.put<boolean>(UPDATE_USER_PHONENUMBER(userPhone.id), userPhone);
  }

  updateUserAddress(userAddress: UserAddress): Observable<boolean> {
    return this._http.put<boolean>(UPDATE_USER_ADDRESS(userAddress.id), userAddress);
  }

  deleteUserAddress(addressId: number): Observable<object> {
    return this._http.delete(DELETE_USER_ADDRESS(addressId));
  }

  deleteUserPhone(phoneId: number): Observable<object> {
    return this._http.delete(DELETE_USER_PHONE(phoneId));
  }

  deleteUserEmail(emailId: number): Observable<object> {
    return this._http.delete(DELETE_USER_EMAIL(emailId));
  }

  // TODO: crteate object filter util
  private mapUserResponse(userModel: UserModelDto): UserModel {
    const ignoreMap = USER_DATA_IGNORE_PROPS.reduce((acc, key) => {
      acc[key] = key;
      return acc;
    }, {});

    return Object.entries(userModel).reduce((acc, [key, value]) => {
      if (nonValue(ignoreMap[key])) {
        acc[key] = value;
      }

      return acc;
    }, {} as UserModel);
  }

  updateAdditionalOrgInfo(
    additionalOrgInfo: AdditionalOrgInfo,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_USER_ADDITIONAL_ORG_INFO,
      additionalOrgInfo,
    );
  }

  getUserByUserName(userLogin: string): Observable<GetUserByUserName> {
    return this._httpClient.get<GetUserByUserName>(GET_USER_BY_USERNAME(userLogin));
  }



  getUserSurveyStatus(): Observable<boolean> {
    return this._http.get<boolean>(GET_USER_SURVEY_STATUS);
  }

  saveUserSurvey(userSurvey: UserSurvey): Observable<boolean> {
    return this._http.post<boolean>(SAVE_USER_SURVEY, userSurvey);
  }

  updateUserProfile(
    userID: number,
    userProfile: RequestUpdateUserProfile,
  ): Observable<ResponseUpdateUserProfile> {
    return this._http.put<ResponseUpdateUserProfile>(
      UPDATE_USER_PROFILE(userID),
      userProfile,
    );
  }


  getHasSeenGuideByGuideId(guideId: number): Observable<boolean> {
    return this._http.get<boolean>(GET_HAS_SEEN_GUIDE(guideId));
  }

  saveHasSeenGuideByGuideId(guideId: number): Observable<boolean> {
    return this._http.post<boolean>(SAVE_HAS_SEEN_GUIDE(guideId), null);
  }

  getUserSystemSettings(): Observable<ResponseUserSystemSettings[]> {
    return this._http
      .get<ResponseUserSystemSettings[]>(GET_USER_SYSTEM_SETTINGS);
  }

  saveUserSystemSetttings(settings: [RequestUserSettingsValueSave]):
    Observable<[ResponseSuccessResult]> {
    return this._http
      .put<[ResponseSuccessResult]>(SAVE_USER_SYSTEM_SETTINGS, settings);
  }

  getUserSystemSettingValue(settingId: number):
    Observable<ResponseUserSystemSettings> {
    return this._http.get<ResponseUserSystemSettings>(
      GET_USER_SYSTEM_SETTING_VALUE(settingId),
    );
  }

  saveUserSystemSettingsValue(setting: ResponseUserSystemSettings):
    Observable<[ResponseSuccessResult]> {
    return this._http
      .put<[ResponseSuccessResult]>(SAVE_USER_SYSTEM_SETTING_VALUE, setting);
  }

  changeUserPassword(changeUserPassword: RequestChangePassword):
    Observable<boolean> {
    return this._http.put<boolean>(CHANGE_USER_PASSWORD, changeUserPassword);
  }

  resetUserPassword(
    resetUserPassword: RequestResetPassword,
  ): Observable<PasswordResetResult> {
    return this._httpClient.put<PasswordResetResult>(
      RESET_USER_PASSWORD,
      resetUserPassword,
    );
  }

  updateTrailAccountStatus(
    userId: number,
    requestTrialStatusCodeId: RequestTrialStatusCodeId,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_TRIAL_ACCOUNT_STATUS(userId),
      requestTrialStatusCodeId,
    );
  }

  shareCallingPost(
    userId: number,
    referringInfo: [RequestReferralInfo],
  ): Observable<boolean> {
    return this._httpClient.put<boolean>(SHARE_CALLINGPOST(userId), referringInfo);
  }

  checkAccountVerificaiton(
    accountInfo: RequestVerifyAccount,
  ): Observable<number> {
    return this._httpClient.post<number>(CHECK_ACCOUNT_VERIFICATION, accountInfo);
  }

  resendAccountVerification(
    accountInfo: RequestVerifyAccount,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(RESEND_ACCOUNT_VERIFICATION, accountInfo);
  }

  sendContactUsEmail(email: RequestSystemEmail): Observable<boolean> {
    return this._http.put<boolean>(SEND_CONTACT_US_EMAIL, email);
  }

  createSubAccountUserInvitation(
    subAccountUserInvite: RequestSubAccountUserUserGroupRoles,
  ): Observable<boolean> {
    return this._http.post<boolean>(
      CREATE_SUBACCOUNT_USER_INVITATION,
      subAccountUserInvite,
    );
  }

  updateSubAccountUserInvitation(
    subAccountUserInvite: RequestSubAccountUserUserGroupRoles,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_SUBACCOUNT_USER_INVITATION,
      subAccountUserInvite,
    );
  }

  deleteSubAccountUser(subAccountUserId: number): Observable<object> {
    return this._http.delete(DELETE_SUBACCOUNT_USER(subAccountUserId));
  }

  registerSubAccountUser(subAccountUser: SubAccountUser): Observable<boolean> {
    return this._http.post<boolean>(REGISTER_SUBACCOUNT_USER, subAccountUser);
  }

  checkUsersDateTimeInUserTimezone(
    dateTimeSettings: DateAndTimeSettings,
  ): Observable<boolean> {
    return this._http.post<boolean>(
      CHECK_DATETIME_IN_USER_TIMEZONE,
      dateTimeSettings,
    );
  }

  getSocialLink(groupId: number): Observable<string> {
    return this._http.put<string>(GET_SOCIAL_LINK, groupId);
  }

  getLoginType(userName: string, password: string): Observable<number> {
    return this._httpClient.put<number>(GET_LOGIN_TYPE(userName, password), null);
  }

  getCallForwardPhoneNumber(
    phoneNumberForwarded: string,
  ): Observable<ResponseCallForward> {
    return this._httpClient.get<ResponseCallForward>(
      GET_CALLFORWARD_PHONENUMBER(phoneNumberForwarded),
    );
  }

  updateCallForwardPhoneNumber(
    boughtPhoneNumberId: number,
    phoneNumberForwarded: string,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      UPDATE_CALLFORWARD_PHONENUMBER(boughtPhoneNumberId, phoneNumberForwarded),
      null,
    );
  }

  insertUserPhoneNumber(
    userId: number,
    phoneNumber: PhoneNumber,
  ): Observable<number> {
    return this._httpClient.post<number>(
      INSERT_USER_PHONENUMBER(userId),
      phoneNumber,
    );
  }

  getPhoneNumbersPurchased(): Observable<[PhoneNumber]> {
    return this._http.get<[PhoneNumber]>(GET_PHONENUMBERS_PURCHASED);
  }

  checkPhoneNumberAvailable(
    phoneNumber: BoughtPhoneNumber,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(CHECK_PHONENUMBER_AVAILABLE, phoneNumber);
  }

  validatePhoneNumber(phoneNumber: BoughtPhoneNumber): Observable<boolean> {
    return this._httpClient.post<boolean>(VALIDATE_PHONE_NUMBER, phoneNumber);
  }

  verifyPhoneNumber(phoneNumber: BoughtPhoneNumber): Observable<boolean> {
    return this._httpClient.post<boolean>(VERIFY_PHONENUMBER_ANONYMOUS, phoneNumber);
  }

  verifyPhoneNumberWithPin(
    phoneNumber: BoughtPhoneNumber,
    pin: number,
  ): Observable<boolean> {
    return this._http.post<boolean>(VERIFY_PHONENUMBER_PIN(pin), phoneNumber);
  }

  getPhoneNumberVerificationStatus(
    verificationId: number,
  ): Observable<PhoneVerificationStatuses> {
    return this._httpClient.get<PhoneVerificationStatuses>(
      GET_PHONENUMBER_VERIFICATION_STATUS(verificationId),
    );
  }

  verifySmsPinValidNoPin(
    phone: BoughtPhoneNumber,
    userId: number,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(VERIFY_SMS_PIN_VALID_NO_PIN(userId), phone);
  }

  verifySmsPinValidWithPin(
    phone: BoughtPhoneNumber,
    userId: number,
    pin: number,
  ): Observable<boolean> {
    return this._httpClient.post<boolean>(
      VERIFY_SMS_PIN_VALID_WITH_PIN(userId, pin),
      phone,
    );
  }

  verifyPhoneVendor(phone: UserPhoneVerification): Observable<object> {
    return this._httpClient.post<object>(
      VERIFY_PHONE_VENDOR,
      phone,
    );
  }

  verifyVendorPin(
    verification: UserPhoneVerificationWithPin,
    userId: number,
  ): Observable<boolean> {
    return this._http.get<boolean>(
      VERIFY_VENDOR_PIN(
        verification.phoneNumber,
        verification.countryCode,
        verification.pin,
        userId,
      ),
    );
  }

  getUserProfileDateTime(): Observable<ResponseUserProfileDateTime> {
    return this._http.get<ResponseUserProfileDateTime>(
      GET_USER_PROFILE_DATETIME,
    );
  }

  getUserAccountStats(): Observable<ResponseAccountQuickViewStats> {
    return this._http.get<ResponseAccountQuickViewStats>(
      GET_USER_ACCOUNT_STATISTICS,
    );
  }

  publicShareCallingPost(
    webUserName: string,
    referrals: [RequestReferralInfo],
  ): Observable<boolean> {
    return this._http.post<boolean>(
      PUBLIC_SHARE_CALLINGPOST(webUserName),
      referrals,
    );
  }

  getAccountOwnerByRequestId(requestId: number): Observable<string> {
    return this._httpClient.get<string>(GET_ACCOUNT_OWNER_BY_REQUESTID(requestId));
  }

  manageSubAccountUserInvite(
    subAccountUserInvite: RequestSubAccountUserUserGroupRoles,
  ): Observable<boolean> {
    return this._http.put<boolean>(
      MANAGE_SUBACCOUNT_INVITATION,
      subAccountUserInvite,
    );
  }

  getAccountsManagedByManagerUserId(
    accountManagerUserId: number,
  ): Observable<[ResponseAccountUserManage]> {
    return this._http.get<[ResponseAccountUserManage]>(
      GET_ACCOUNTS_MANAGED_BY_MANAGERUSERID(accountManagerUserId),
    );
  }

  getUsersIManage(): Observable<[ResponseUsersIManage]> {
    return this._http.get<[ResponseUsersIManage]>(GET_USERS_I_MANAGE);
  }

  getUsersIManageWithGroups(): Observable<ResponseUsersIManageGroupDisplay> {
    return this._http.get<ResponseUsersIManageGroupDisplay>(
      GET_USERS_I_MANAGE_WITH_GROUPS,
    );
  }
}
