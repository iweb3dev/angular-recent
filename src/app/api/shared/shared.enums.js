"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotificationLookupIds = exports.CommunicationConfirmActionTypes = exports.TransactionTypes = exports.PackageTypeIds = exports.MediaType = exports.PublicGroupPageSaveType = exports.AttachmentTypes = exports.ReceiverAccountTypes = exports.VolunteerSheetStatuses = exports.GivingFrequency = exports.EventMemberStatuses = exports.EventStatuses = exports.IntervalTypes = exports.EventReminderSendToTypes = exports.SignUpTypes = exports.EventTypes = exports.ReminderFrequency = exports.PaymentStatuses = exports.OrderTypes = exports.AuthCaptureTypes = exports.PaymentTypes = exports.LineItemTypes = exports.SubscriptionChangeTypes = exports.CardTypes = exports.BankAccountTypes = exports.PaymentPrograms = exports.SaveMemberEndpointResults = exports.MemberProfileSaveTypes = exports.ImportFileTypes = exports.ImportMessageType = exports.AddNewMemberResults = exports.EmailAddressLocations = exports.EmailAddressStatuses = exports.PhoneNumberStatuses = exports.PhoneNumberLocations = exports.PhoneNumberTypes = exports.AddressStatuses = exports.AddressLocations = exports.SMSStatuses = exports.GroupMemberStatuses = exports.IsActiveStatuses = exports.CommunicationEndpointTypes = exports.MessageHistoryTypes = exports.NotificationStatusTypes = exports.BuildCommunicationResults = exports.CommunicationStatsTimePeriod = exports.PhoneVerificationStatuses = exports.PasswordResetResult = exports.UserSystemSettingCategories = exports.SentViaTypes = void 0;
var SentViaTypes;
(function (SentViaTypes) {
    SentViaTypes[SentViaTypes["unknown"] = 0] = "unknown";
    SentViaTypes[SentViaTypes["web"] = 1] = "web";
    SentViaTypes[SentViaTypes["phone"] = 2] = "phone";
})(SentViaTypes = exports.SentViaTypes || (exports.SentViaTypes = {}));
var UserSystemSettingCategories;
(function (UserSystemSettingCategories) {
    UserSystemSettingCategories[UserSystemSettingCategories["privacy"] = 0] = "privacy";
    UserSystemSettingCategories[UserSystemSettingCategories["mapping"] = 1] = "mapping";
    UserSystemSettingCategories[UserSystemSettingCategories["system"] = 2] = "system";
})(UserSystemSettingCategories = exports.UserSystemSettingCategories || (exports.UserSystemSettingCategories = {}));
var PasswordResetResult;
(function (PasswordResetResult) {
    PasswordResetResult[PasswordResetResult["email"] = 0] = "email";
    PasswordResetResult[PasswordResetResult["phone"] = 1] = "phone";
    PasswordResetResult[PasswordResetResult["resetFailed"] = 2] = "resetFailed";
    PasswordResetResult[PasswordResetResult["classicAccount"] = 3] = "classicAccount";
})(PasswordResetResult = exports.PasswordResetResult || (exports.PasswordResetResult = {}));
var PhoneVerificationStatuses;
(function (PhoneVerificationStatuses) {
    PhoneVerificationStatuses[PhoneVerificationStatuses["unknown"] = 0] = "unknown";
    PhoneVerificationStatuses[PhoneVerificationStatuses["processing"] = 1] = "processing";
    PhoneVerificationStatuses[PhoneVerificationStatuses["sendingcall"] = 2] = "sendingcall";
    PhoneVerificationStatuses[PhoneVerificationStatuses["verified"] = 3] = "verified";
    PhoneVerificationStatuses[PhoneVerificationStatuses["notVerified"] = 4] = "notVerified";
    PhoneVerificationStatuses[PhoneVerificationStatuses["answered"] = 5] = "answered";
})(PhoneVerificationStatuses = exports.PhoneVerificationStatuses || (exports.PhoneVerificationStatuses = {}));
var CommunicationStatsTimePeriod;
(function (CommunicationStatsTimePeriod) {
    CommunicationStatsTimePeriod[CommunicationStatsTimePeriod["allTime"] = 0] = "allTime";
    CommunicationStatsTimePeriod[CommunicationStatsTimePeriod["last7Days"] = 1] = "last7Days";
    CommunicationStatsTimePeriod[CommunicationStatsTimePeriod["lastMonth"] = 2] = "lastMonth";
    CommunicationStatsTimePeriod[CommunicationStatsTimePeriod["lastSixMonths"] = 3] = "lastSixMonths";
})(CommunicationStatsTimePeriod = exports.CommunicationStatsTimePeriod || (exports.CommunicationStatsTimePeriod = {}));
var BuildCommunicationResults;
(function (BuildCommunicationResults) {
    BuildCommunicationResults[BuildCommunicationResults["failed_InsufficientCredits"] = 1] = "failed_InsufficientCredits";
    BuildCommunicationResults[BuildCommunicationResults["failed_MoveFiles"] = 2] = "failed_MoveFiles";
    BuildCommunicationResults[BuildCommunicationResults["failed_PutOnHold"] = 3] = "failed_PutOnHold";
    BuildCommunicationResults[BuildCommunicationResults["failed_Exception"] = 4] = "failed_Exception";
    BuildCommunicationResults[BuildCommunicationResults["success"] = 5] = "success";
    BuildCommunicationResults[BuildCommunicationResults["success_AutoBilled"] = 6] = "success_AutoBilled";
    BuildCommunicationResults[BuildCommunicationResults["failed_NoEndpoints"] = 7] = "failed_NoEndpoints";
})(BuildCommunicationResults = exports.BuildCommunicationResults || (exports.BuildCommunicationResults = {}));
var NotificationStatusTypes;
(function (NotificationStatusTypes) {
    NotificationStatusTypes[NotificationStatusTypes["unknown"] = 0] = "unknown";
    NotificationStatusTypes[NotificationStatusTypes["scheduled"] = 1] = "scheduled";
    NotificationStatusTypes[NotificationStatusTypes["started"] = 2] = "started";
    NotificationStatusTypes[NotificationStatusTypes["cancelled"] = 3] = "cancelled";
    NotificationStatusTypes[NotificationStatusTypes["paused"] = 4] = "paused";
    NotificationStatusTypes[NotificationStatusTypes["completed"] = 5] = "completed";
    NotificationStatusTypes[NotificationStatusTypes["ended"] = 6] = "ended";
})(NotificationStatusTypes = exports.NotificationStatusTypes || (exports.NotificationStatusTypes = {}));
var MessageHistoryTypes;
(function (MessageHistoryTypes) {
    MessageHistoryTypes[MessageHistoryTypes["inProgress"] = 0] = "inProgress";
    MessageHistoryTypes[MessageHistoryTypes["completed"] = 1] = "completed";
    MessageHistoryTypes[MessageHistoryTypes["cancelled"] = 2] = "cancelled";
    MessageHistoryTypes[MessageHistoryTypes["all"] = 3] = "all";
    MessageHistoryTypes[MessageHistoryTypes["scheduled"] = 4] = "scheduled";
})(MessageHistoryTypes = exports.MessageHistoryTypes || (exports.MessageHistoryTypes = {}));
var CommunicationEndpointTypes;
(function (CommunicationEndpointTypes) {
    CommunicationEndpointTypes[CommunicationEndpointTypes["phone"] = 1] = "phone";
    CommunicationEndpointTypes[CommunicationEndpointTypes["sms"] = 2] = "sms";
    CommunicationEndpointTypes[CommunicationEndpointTypes["email"] = 3] = "email";
    CommunicationEndpointTypes[CommunicationEndpointTypes["fax"] = 4] = "fax";
})(CommunicationEndpointTypes = exports.CommunicationEndpointTypes || (exports.CommunicationEndpointTypes = {}));
var IsActiveStatuses;
(function (IsActiveStatuses) {
    IsActiveStatuses[IsActiveStatuses["deactive"] = 0] = "deactive";
    IsActiveStatuses[IsActiveStatuses["active"] = 1] = "active";
    IsActiveStatuses[IsActiveStatuses["both"] = 2] = "both";
})(IsActiveStatuses = exports.IsActiveStatuses || (exports.IsActiveStatuses = {}));
var GroupMemberStatuses;
(function (GroupMemberStatuses) {
    GroupMemberStatuses[GroupMemberStatuses["unknown"] = 0] = "unknown";
    GroupMemberStatuses[GroupMemberStatuses["pendingApproval"] = 1] = "pendingApproval";
    GroupMemberStatuses[GroupMemberStatuses["noApprovalRequired"] = 2] = "noApprovalRequired";
    GroupMemberStatuses[GroupMemberStatuses["approved"] = 3] = "approved";
    GroupMemberStatuses[GroupMemberStatuses["denied"] = 4] = "denied";
    GroupMemberStatuses[GroupMemberStatuses["removed"] = 5] = "removed";
})(GroupMemberStatuses = exports.GroupMemberStatuses || (exports.GroupMemberStatuses = {}));
var SMSStatuses;
(function (SMSStatuses) {
    SMSStatuses[SMSStatuses["unknown"] = 0] = "unknown";
    SMSStatuses[SMSStatuses["optinRequestSent"] = 1] = "optinRequestSent";
    SMSStatuses[SMSStatuses["optedIn"] = 2] = "optedIn";
    SMSStatuses[SMSStatuses["optedOut"] = 3] = "optedOut";
    SMSStatuses[SMSStatuses["optedOutGlobal"] = 4] = "optedOutGlobal";
    SMSStatuses[SMSStatuses["unTextable"] = 5] = "unTextable";
})(SMSStatuses = exports.SMSStatuses || (exports.SMSStatuses = {}));
var AddressLocations;
(function (AddressLocations) {
    AddressLocations[AddressLocations["other"] = 0] = "other";
    AddressLocations[AddressLocations["home"] = 1] = "home";
    AddressLocations[AddressLocations["work"] = 2] = "work";
})(AddressLocations = exports.AddressLocations || (exports.AddressLocations = {}));
var AddressStatuses;
(function (AddressStatuses) {
    AddressStatuses[AddressStatuses["valid"] = 1] = "valid";
    AddressStatuses[AddressStatuses["unknown"] = 2] = "unknown";
    AddressStatuses[AddressStatuses["invalid"] = 3] = "invalid";
})(AddressStatuses = exports.AddressStatuses || (exports.AddressStatuses = {}));
var PhoneNumberTypes;
(function (PhoneNumberTypes) {
    PhoneNumberTypes[PhoneNumberTypes["unknown"] = 0] = "unknown";
    PhoneNumberTypes[PhoneNumberTypes["voice"] = 1] = "voice";
    PhoneNumberTypes[PhoneNumberTypes["boughtPhoneNumber"] = 2] = "boughtPhoneNumber";
    PhoneNumberTypes[PhoneNumberTypes["callerID"] = 4] = "callerID";
})(PhoneNumberTypes = exports.PhoneNumberTypes || (exports.PhoneNumberTypes = {}));
var PhoneNumberLocations;
(function (PhoneNumberLocations) {
    PhoneNumberLocations[PhoneNumberLocations["other"] = 0] = "other";
    PhoneNumberLocations[PhoneNumberLocations["home"] = 1] = "home";
    PhoneNumberLocations[PhoneNumberLocations["work"] = 2] = "work";
    PhoneNumberLocations[PhoneNumberLocations["mobile"] = 3] = "mobile";
})(PhoneNumberLocations = exports.PhoneNumberLocations || (exports.PhoneNumberLocations = {}));
var PhoneNumberStatuses;
(function (PhoneNumberStatuses) {
    PhoneNumberStatuses[PhoneNumberStatuses["valid"] = 1] = "valid";
    PhoneNumberStatuses[PhoneNumberStatuses["unknown"] = 2] = "unknown";
    PhoneNumberStatuses[PhoneNumberStatuses["invalid"] = 3] = "invalid";
})(PhoneNumberStatuses = exports.PhoneNumberStatuses || (exports.PhoneNumberStatuses = {}));
var EmailAddressStatuses;
(function (EmailAddressStatuses) {
    EmailAddressStatuses[EmailAddressStatuses["valid"] = 1] = "valid";
    EmailAddressStatuses[EmailAddressStatuses["unknown"] = 2] = "unknown";
    EmailAddressStatuses[EmailAddressStatuses["invalid"] = 3] = "invalid";
})(EmailAddressStatuses = exports.EmailAddressStatuses || (exports.EmailAddressStatuses = {}));
var EmailAddressLocations;
(function (EmailAddressLocations) {
    EmailAddressLocations[EmailAddressLocations["other"] = 0] = "other";
    EmailAddressLocations[EmailAddressLocations["home"] = 1] = "home";
    EmailAddressLocations[EmailAddressLocations["work"] = 2] = "work";
})(EmailAddressLocations = exports.EmailAddressLocations || (exports.EmailAddressLocations = {}));
var AddNewMemberResults;
(function (AddNewMemberResults) {
    AddNewMemberResults[AddNewMemberResults["unknown"] = 0] = "unknown";
    AddNewMemberResults[AddNewMemberResults["addedMember"] = 1] = "addedMember";
    AddNewMemberResults[AddNewMemberResults["addedUser"] = 2] = "addedUser";
    AddNewMemberResults[AddNewMemberResults["requestSent"] = 3] = "requestSent";
    AddNewMemberResults[AddNewMemberResults["conflictExists"] = 4] = "conflictExists";
    AddNewMemberResults[AddNewMemberResults["error"] = 5] = "error";
    AddNewMemberResults[AddNewMemberResults["approvalRequiredToJoin"] = 6] = "approvalRequiredToJoin";
    AddNewMemberResults[AddNewMemberResults["groupMemberLimitExceeded"] = 12] = "groupMemberLimitExceeded";
})(AddNewMemberResults = exports.AddNewMemberResults || (exports.AddNewMemberResults = {}));
var ImportMessageType;
(function (ImportMessageType) {
    ImportMessageType[ImportMessageType["information"] = 1] = "information";
    ImportMessageType[ImportMessageType["warning"] = 2] = "warning";
    ImportMessageType[ImportMessageType["error"] = 3] = "error";
})(ImportMessageType = exports.ImportMessageType || (exports.ImportMessageType = {}));
var ImportFileTypes;
(function (ImportFileTypes) {
    ImportFileTypes[ImportFileTypes["unknown"] = 0] = "unknown";
    ImportFileTypes[ImportFileTypes["xls"] = 1] = "xls";
    ImportFileTypes[ImportFileTypes["xlxs"] = 2] = "xlxs";
    ImportFileTypes[ImportFileTypes["csv"] = 3] = "csv";
    ImportFileTypes[ImportFileTypes["txt"] = 4] = "txt";
    ImportFileTypes[ImportFileTypes["mdb"] = 5] = "mdb";
})(ImportFileTypes = exports.ImportFileTypes || (exports.ImportFileTypes = {}));
var MemberProfileSaveTypes;
(function (MemberProfileSaveTypes) {
    MemberProfileSaveTypes[MemberProfileSaveTypes["user"] = 0] = "user";
    MemberProfileSaveTypes[MemberProfileSaveTypes["phoneNumber"] = 1] = "phoneNumber";
    MemberProfileSaveTypes[MemberProfileSaveTypes["emailAddress"] = 2] = "emailAddress";
    MemberProfileSaveTypes[MemberProfileSaveTypes["address"] = 3] = "address";
    MemberProfileSaveTypes[MemberProfileSaveTypes["additionalField"] = 4] = "additionalField";
})(MemberProfileSaveTypes = exports.MemberProfileSaveTypes || (exports.MemberProfileSaveTypes = {}));
var SaveMemberEndpointResults;
(function (SaveMemberEndpointResults) {
    SaveMemberEndpointResults[SaveMemberEndpointResults["unknown"] = 0] = "unknown";
    SaveMemberEndpointResults[SaveMemberEndpointResults["successDelete"] = 1] = "successDelete";
    SaveMemberEndpointResults[SaveMemberEndpointResults["successUpdate"] = 2] = "successUpdate";
    SaveMemberEndpointResults[SaveMemberEndpointResults["successInsert"] = 3] = "successInsert";
    SaveMemberEndpointResults[SaveMemberEndpointResults["validationErrors"] = 4] = "validationErrors";
    SaveMemberEndpointResults[SaveMemberEndpointResults["error"] = 5] = "error";
    SaveMemberEndpointResults[SaveMemberEndpointResults["failedDueToassociation"] = 6] = "failedDueToassociation";
})(SaveMemberEndpointResults = exports.SaveMemberEndpointResults || (exports.SaveMemberEndpointResults = {}));
var PaymentPrograms;
(function (PaymentPrograms) {
    PaymentPrograms[PaymentPrograms["creditCard"] = 0] = "creditCard";
    PaymentPrograms[PaymentPrograms["bankCreditCard"] = 1] = "bankCreditCard";
    PaymentPrograms[PaymentPrograms["payPal"] = 2] = "payPal";
})(PaymentPrograms = exports.PaymentPrograms || (exports.PaymentPrograms = {}));
var BankAccountTypes;
(function (BankAccountTypes) {
    BankAccountTypes[BankAccountTypes["checking"] = 0] = "checking";
    BankAccountTypes[BankAccountTypes["businessChecking"] = 1] = "businessChecking";
    BankAccountTypes[BankAccountTypes["savings"] = 2] = "savings";
})(BankAccountTypes = exports.BankAccountTypes || (exports.BankAccountTypes = {}));
var CardTypes;
(function (CardTypes) {
    CardTypes[CardTypes["unknown"] = 0] = "unknown";
    CardTypes[CardTypes["visa"] = 1] = "visa";
    CardTypes[CardTypes["masterCard"] = 2] = "masterCard";
    CardTypes[CardTypes["discover"] = 3] = "discover";
    CardTypes[CardTypes["americanExpress"] = 4] = "americanExpress";
    CardTypes[CardTypes["dinersClub"] = 5] = "dinersClub";
    CardTypes[CardTypes["jcb"] = 6] = "jcb";
    CardTypes[CardTypes["enroute"] = 7] = "enroute";
})(CardTypes = exports.CardTypes || (exports.CardTypes = {}));
var SubscriptionChangeTypes;
(function (SubscriptionChangeTypes) {
    SubscriptionChangeTypes[SubscriptionChangeTypes["upgrade"] = 1] = "upgrade";
    SubscriptionChangeTypes[SubscriptionChangeTypes["downgrade"] = 2] = "downgrade";
    SubscriptionChangeTypes[SubscriptionChangeTypes["suspend"] = 3] = "suspend";
    SubscriptionChangeTypes[SubscriptionChangeTypes["unsuspend"] = 4] = "unsuspend";
    SubscriptionChangeTypes[SubscriptionChangeTypes["prepay"] = 5] = "prepay";
    SubscriptionChangeTypes[SubscriptionChangeTypes["extend"] = 6] = "extend";
    SubscriptionChangeTypes[SubscriptionChangeTypes["reActivate"] = 7] = "reActivate";
    SubscriptionChangeTypes[SubscriptionChangeTypes["queueDowngrade"] = 8] = "queueDowngrade";
    SubscriptionChangeTypes[SubscriptionChangeTypes["trialPlan"] = 9] = "trialPlan";
})(SubscriptionChangeTypes = exports.SubscriptionChangeTypes || (exports.SubscriptionChangeTypes = {}));
var LineItemTypes;
(function (LineItemTypes) {
    LineItemTypes[LineItemTypes["packageUpgrade"] = 1] = "packageUpgrade";
    LineItemTypes[LineItemTypes["credit"] = 2] = "credit";
    LineItemTypes[LineItemTypes["packageRenewal"] = 3] = "packageRenewal";
    LineItemTypes[LineItemTypes["packageRenewalPrepaid"] = 4] = "packageRenewalPrepaid";
    LineItemTypes[LineItemTypes["packageDowngrade"] = 5] = "packageDowngrade";
    LineItemTypes[LineItemTypes["pbx"] = 6] = "pbx";
    LineItemTypes[LineItemTypes["purchaseDomainName"] = 7] = "purchaseDomainName";
    LineItemTypes[LineItemTypes["phoneNumber"] = 8] = "phoneNumber";
    LineItemTypes[LineItemTypes["keywords"] = 9] = "keywords";
})(LineItemTypes = exports.LineItemTypes || (exports.LineItemTypes = {}));
var PaymentTypes;
(function (PaymentTypes) {
    PaymentTypes[PaymentTypes["creditCard"] = 0] = "creditCard";
    PaymentTypes[PaymentTypes["echeck"] = 1] = "echeck";
    PaymentTypes[PaymentTypes["paperCheck"] = 2] = "paperCheck";
    PaymentTypes[PaymentTypes["freeOrder"] = 3] = "freeOrder";
    PaymentTypes[PaymentTypes["prePaidOrder"] = 4] = "prePaidOrder";
    PaymentTypes[PaymentTypes["unknown"] = 5] = "unknown";
    PaymentTypes[PaymentTypes["payPal"] = 6] = "payPal";
})(PaymentTypes = exports.PaymentTypes || (exports.PaymentTypes = {}));
var AuthCaptureTypes;
(function (AuthCaptureTypes) {
    AuthCaptureTypes[AuthCaptureTypes["authorizationOnly"] = 0] = "authorizationOnly";
    AuthCaptureTypes[AuthCaptureTypes["captureOnly"] = 1] = "captureOnly";
    AuthCaptureTypes[AuthCaptureTypes["authCapture"] = 2] = "authCapture";
})(AuthCaptureTypes = exports.AuthCaptureTypes || (exports.AuthCaptureTypes = {}));
var OrderTypes;
(function (OrderTypes) {
    OrderTypes[OrderTypes["Unknown"] = 0] = "Unknown";
    OrderTypes[OrderTypes["AdditionalCredits"] = 1] = "AdditionalCredits";
    OrderTypes[OrderTypes["FreeCredits"] = 2] = "FreeCredits";
    OrderTypes[OrderTypes["Upgrade"] = 3] = "Upgrade";
    OrderTypes[OrderTypes["Extension"] = 4] = "Extension";
    OrderTypes[OrderTypes["Renewal"] = 5] = "Renewal";
    OrderTypes[OrderTypes["Downgrade"] = 6] = "Downgrade";
    OrderTypes[OrderTypes["QueueDowngrade"] = 7] = "QueueDowngrade";
    OrderTypes[OrderTypes["DomainNamePurchase"] = 8] = "DomainNamePurchase";
    OrderTypes[OrderTypes["PhoneNumber"] = 9] = "PhoneNumber";
    OrderTypes[OrderTypes["Keywords"] = 10] = "Keywords";
})(OrderTypes = exports.OrderTypes || (exports.OrderTypes = {}));
var PaymentStatuses;
(function (PaymentStatuses) {
    PaymentStatuses[PaymentStatuses["complete"] = 0] = "complete";
    PaymentStatuses[PaymentStatuses["pending"] = 1] = "pending";
    PaymentStatuses[PaymentStatuses["pending_PaperCheck"] = 2] = "pending_PaperCheck";
    PaymentStatuses[PaymentStatuses["void"] = 3] = "void";
})(PaymentStatuses = exports.PaymentStatuses || (exports.PaymentStatuses = {}));
var ReminderFrequency;
(function (ReminderFrequency) {
    ReminderFrequency[ReminderFrequency["daily"] = 1] = "daily";
    ReminderFrequency[ReminderFrequency["weekly"] = 2] = "weekly";
    ReminderFrequency[ReminderFrequency["monthly"] = 3] = "monthly";
    ReminderFrequency[ReminderFrequency["yearly"] = 4] = "yearly";
})(ReminderFrequency = exports.ReminderFrequency || (exports.ReminderFrequency = {}));
var EventTypes;
(function (EventTypes) {
    EventTypes[EventTypes["simpleEvent"] = 0] = "simpleEvent";
    EventTypes[EventTypes["signUpEvent"] = 1] = "signUpEvent";
    EventTypes[EventTypes["volunteerRoleForEvent"] = 2] = "volunteerRoleForEvent";
    EventTypes[EventTypes["volunteerRoleForVolunteerSheet"] = 3] = "volunteerRoleForVolunteerSheet";
})(EventTypes = exports.EventTypes || (exports.EventTypes = {}));
var SignUpTypes;
(function (SignUpTypes) {
    SignUpTypes[SignUpTypes["anyOne"] = 0] = "anyOne";
    SignUpTypes[SignUpTypes["groupMembersOnly"] = 1] = "groupMembersOnly";
    SignUpTypes[SignUpTypes["addToGroupOnSignUp"] = 2] = "addToGroupOnSignUp";
})(SignUpTypes = exports.SignUpTypes || (exports.SignUpTypes = {}));
var EventReminderSendToTypes;
(function (EventReminderSendToTypes) {
    EventReminderSendToTypes[EventReminderSendToTypes["signedUpMembers"] = 1] = "signedUpMembers";
    EventReminderSendToTypes[EventReminderSendToTypes["notSignedUpMembers"] = 2] = "notSignedUpMembers";
    EventReminderSendToTypes[EventReminderSendToTypes["me"] = 4] = "me";
})(EventReminderSendToTypes = exports.EventReminderSendToTypes || (exports.EventReminderSendToTypes = {}));
var IntervalTypes;
(function (IntervalTypes) {
    IntervalTypes[IntervalTypes["minutes"] = 0] = "minutes";
    IntervalTypes[IntervalTypes["hour"] = 1] = "hour";
    IntervalTypes[IntervalTypes["day"] = 2] = "day";
    IntervalTypes[IntervalTypes["week"] = 3] = "week";
    IntervalTypes[IntervalTypes["month"] = 4] = "month";
    IntervalTypes[IntervalTypes["year"] = 5] = "year";
})(IntervalTypes = exports.IntervalTypes || (exports.IntervalTypes = {}));
var EventStatuses;
(function (EventStatuses) {
    EventStatuses[EventStatuses["unknown"] = 0] = "unknown";
    EventStatuses[EventStatuses["inProgress"] = 1] = "inProgress";
    EventStatuses[EventStatuses["notStarted"] = 2] = "notStarted";
    EventStatuses[EventStatuses["completed"] = 3] = "completed";
})(EventStatuses = exports.EventStatuses || (exports.EventStatuses = {}));
var EventMemberStatuses;
(function (EventMemberStatuses) {
    EventMemberStatuses[EventMemberStatuses["unknown"] = 0] = "unknown";
    EventMemberStatuses[EventMemberStatuses["notSignedUp"] = 1] = "notSignedUp";
    EventMemberStatuses[EventMemberStatuses["signedUp"] = 2] = "signedUp";
})(EventMemberStatuses = exports.EventMemberStatuses || (exports.EventMemberStatuses = {}));
var GivingFrequency;
(function (GivingFrequency) {
    GivingFrequency[GivingFrequency["unknown"] = 0] = "unknown";
    GivingFrequency[GivingFrequency["daily"] = 1] = "daily";
    GivingFrequency[GivingFrequency["weekly"] = 2] = "weekly";
    GivingFrequency[GivingFrequency["monthly"] = 3] = "monthly";
    GivingFrequency[GivingFrequency["yearly"] = 4] = "yearly";
})(GivingFrequency = exports.GivingFrequency || (exports.GivingFrequency = {}));
var VolunteerSheetStatuses;
(function (VolunteerSheetStatuses) {
    VolunteerSheetStatuses[VolunteerSheetStatuses["unknown"] = 0] = "unknown";
    VolunteerSheetStatuses[VolunteerSheetStatuses["inProgress"] = 1] = "inProgress";
    VolunteerSheetStatuses[VolunteerSheetStatuses["notStarted"] = 2] = "notStarted";
    VolunteerSheetStatuses[VolunteerSheetStatuses["completed"] = 3] = "completed";
})(VolunteerSheetStatuses = exports.VolunteerSheetStatuses || (exports.VolunteerSheetStatuses = {}));
var ReceiverAccountTypes;
(function (ReceiverAccountTypes) {
    ReceiverAccountTypes[ReceiverAccountTypes["unknown"] = 0] = "unknown";
    ReceiverAccountTypes[ReceiverAccountTypes["payPal"] = 1] = "payPal";
    ReceiverAccountTypes[ReceiverAccountTypes["stripe"] = 2] = "stripe";
})(ReceiverAccountTypes = exports.ReceiverAccountTypes || (exports.ReceiverAccountTypes = {}));
var AttachmentTypes;
(function (AttachmentTypes) {
    AttachmentTypes[AttachmentTypes["Unknown"] = 0] = "Unknown";
    AttachmentTypes[AttachmentTypes["Email"] = 1] = "Email";
    AttachmentTypes[AttachmentTypes["Fax"] = 2] = "Fax";
    AttachmentTypes[AttachmentTypes["Phone"] = 3] = "Phone";
})(AttachmentTypes = exports.AttachmentTypes || (exports.AttachmentTypes = {}));
var PublicGroupPageSaveType;
(function (PublicGroupPageSaveType) {
    PublicGroupPageSaveType[PublicGroupPageSaveType["All"] = 0] = "All";
    PublicGroupPageSaveType[PublicGroupPageSaveType["PageContent"] = 1] = "PageContent";
    PublicGroupPageSaveType[PublicGroupPageSaveType["SiteColor"] = 2] = "SiteColor";
    PublicGroupPageSaveType[PublicGroupPageSaveType["HeaderInfo"] = 3] = "HeaderInfo";
    PublicGroupPageSaveType[PublicGroupPageSaveType["Suspend"] = 4] = "Suspend";
    PublicGroupPageSaveType[PublicGroupPageSaveType["GroupPicture"] = 5] = "GroupPicture";
    PublicGroupPageSaveType[PublicGroupPageSaveType["AboutUs"] = 6] = "AboutUs";
    PublicGroupPageSaveType[PublicGroupPageSaveType["Footer"] = 7] = "Footer";
    PublicGroupPageSaveType[PublicGroupPageSaveType["MapArea"] = 8] = "MapArea";
    PublicGroupPageSaveType[PublicGroupPageSaveType["Seo"] = 9] = "Seo";
    PublicGroupPageSaveType[PublicGroupPageSaveType["Giving"] = 10] = "Giving";
})(PublicGroupPageSaveType = exports.PublicGroupPageSaveType || (exports.PublicGroupPageSaveType = {}));
var MediaType;
(function (MediaType) {
    MediaType[MediaType["Image"] = 0] = "Image";
    MediaType[MediaType["Video"] = 1] = "Video";
    MediaType[MediaType["Document"] = 2] = "Document";
    MediaType[MediaType["Audio"] = 3] = "Audio";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var PackageTypeIds;
(function (PackageTypeIds) {
    PackageTypeIds[PackageTypeIds["PayAsYouGo"] = 1] = "PayAsYouGo";
    PackageTypeIds[PackageTypeIds["MonthlyCredits"] = 2] = "MonthlyCredits";
    PackageTypeIds[PackageTypeIds["Unlimited"] = 3] = "Unlimited";
    PackageTypeIds[PackageTypeIds["Freemium"] = 4] = "Freemium";
    PackageTypeIds[PackageTypeIds["Essentials"] = 5] = "Essentials";
    PackageTypeIds[PackageTypeIds["Standard"] = 6] = "Standard";
    PackageTypeIds[PackageTypeIds["Premium"] = 7] = "Premium";
})(PackageTypeIds = exports.PackageTypeIds || (exports.PackageTypeIds = {}));
var TransactionTypes;
(function (TransactionTypes) {
    TransactionTypes[TransactionTypes["Unknown"] = 0] = "Unknown";
    TransactionTypes[TransactionTypes["Purchase"] = 1] = "Purchase";
    TransactionTypes[TransactionTypes["User"] = 2] = "User";
    TransactionTypes[TransactionTypes["Transferred"] = 3] = "Transferred";
    TransactionTypes[TransactionTypes["Received"] = 4] = "Received";
    TransactionTypes[TransactionTypes["CreditBack"] = 5] = "CreditBack";
    TransactionTypes[TransactionTypes["CancelOrder"] = 6] = "CancelOrder";
    TransactionTypes[TransactionTypes["Advance"] = 7] = "Advance";
    TransactionTypes[TransactionTypes["PaymentProcessing"] = 8] = "PaymentProcessing";
    TransactionTypes[TransactionTypes["PackageChangeAdjustmentUp"] = 9] = "PackageChangeAdjustmentUp";
    TransactionTypes[TransactionTypes["FreeBonus"] = 10] = "FreeBonus";
    TransactionTypes[TransactionTypes["FreeMonthly"] = 11] = "FreeMonthly";
    TransactionTypes[TransactionTypes["ReferralBonus"] = 12] = "ReferralBonus";
    TransactionTypes[TransactionTypes["PackageChangeAdjustmentDown"] = 13] = "PackageChangeAdjustmentDown";
    TransactionTypes[TransactionTypes["CreditsDuration"] = 14] = "CreditsDuration";
})(TransactionTypes = exports.TransactionTypes || (exports.TransactionTypes = {}));
var CommunicationConfirmActionTypes;
(function (CommunicationConfirmActionTypes) {
    CommunicationConfirmActionTypes[CommunicationConfirmActionTypes["CommunicationConfirmed"] = 1] = "CommunicationConfirmed";
    CommunicationConfirmActionTypes[CommunicationConfirmActionTypes["CommunicationCancelledIssueCredits"] = 2] = "CommunicationCancelledIssueCredits";
})(CommunicationConfirmActionTypes = exports.CommunicationConfirmActionTypes || (exports.CommunicationConfirmActionTypes = {}));
var UserNotificationLookupIds;
(function (UserNotificationLookupIds) {
    UserNotificationLookupIds[UserNotificationLookupIds["UserWouldLikeToAddYouToHisGroup"] = 1] = "UserWouldLikeToAddYouToHisGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["UserWouldLikeToBeAddedToYourGroup"] = 2] = "UserWouldLikeToBeAddedToYourGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["UserHasRemovedYouFromHisGroup"] = 3] = "UserHasRemovedYouFromHisGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["UserHasRemovedHimselfFromYourGroup"] = 4] = "UserHasRemovedHimselfFromYourGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["ImportResult"] = 6] = "ImportResult";
    UserNotificationLookupIds[UserNotificationLookupIds["FinancialNotification"] = 7] = "FinancialNotification";
    UserNotificationLookupIds[UserNotificationLookupIds["MapProcessingResult"] = 8] = "MapProcessingResult";
    UserNotificationLookupIds[UserNotificationLookupIds["UserHasAddedYouToGroup"] = 9] = "UserHasAddedYouToGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["UserHasBecomeAMemberOfYourGroup"] = 11] = "UserHasBecomeAMemberOfYourGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["YouHaveBeenAddedToGroup"] = 12] = "YouHaveBeenAddedToGroup";
    UserNotificationLookupIds[UserNotificationLookupIds["MappingDataRetrieved"] = 13] = "MappingDataRetrieved";
    UserNotificationLookupIds[UserNotificationLookupIds["UserSignedUpForEvent"] = 14] = "UserSignedUpForEvent";
    UserNotificationLookupIds[UserNotificationLookupIds["UserVolunteeredForRole"] = 15] = "UserVolunteeredForRole";
    UserNotificationLookupIds[UserNotificationLookupIds["YouHaveSignedUpForEvent"] = 16] = "YouHaveSignedUpForEvent";
    UserNotificationLookupIds[UserNotificationLookupIds["YouHaveVolunteeredForRole"] = 17] = "YouHaveVolunteeredForRole";
    UserNotificationLookupIds[UserNotificationLookupIds["ImportResultGroupCreateFailed"] = 18] = "ImportResultGroupCreateFailed";
    UserNotificationLookupIds[UserNotificationLookupIds["ImportResultNoMembersImported"] = 19] = "ImportResultNoMembersImported";
    UserNotificationLookupIds[UserNotificationLookupIds["ImportRestultInvalidFile"] = 20] = "ImportRestultInvalidFile";
    UserNotificationLookupIds[UserNotificationLookupIds["CampaignProcessingResult"] = 21] = "CampaignProcessingResult";
    UserNotificationLookupIds[UserNotificationLookupIds["InsufficentCreditsToSendReminder"] = 22] = "InsufficentCreditsToSendReminder";
    UserNotificationLookupIds[UserNotificationLookupIds["UnableToCreateReocurranceReminder"] = 23] = "UnableToCreateReocurranceReminder";
    UserNotificationLookupIds[UserNotificationLookupIds["InappropriateTopicOrComment"] = 24] = "InappropriateTopicOrComment";
    UserNotificationLookupIds[UserNotificationLookupIds["ReferralCreditsGivenNotice"] = 25] = "ReferralCreditsGivenNotice";
    UserNotificationLookupIds[UserNotificationLookupIds["CommunicationEndPointResponse"] = 26] = "CommunicationEndPointResponse";
    UserNotificationLookupIds[UserNotificationLookupIds["UserSignedUpForEventNoPaymentOfEventCost"] = 27] = "UserSignedUpForEventNoPaymentOfEventCost";
    UserNotificationLookupIds[UserNotificationLookupIds["UserSignedUpForEventWithPaymentOfEventCost"] = 28] = "UserSignedUpForEventWithPaymentOfEventCost";
    UserNotificationLookupIds[UserNotificationLookupIds["importProgress"] = 29] = "importProgress";
    UserNotificationLookupIds[UserNotificationLookupIds["UserSignedUpForGroupsEvent"] = 30] = "UserSignedUpForGroupsEvent";
    UserNotificationLookupIds[UserNotificationLookupIds["UserSignedUpForOpportunity"] = 31] = "UserSignedUpForOpportunity";
})(UserNotificationLookupIds = exports.UserNotificationLookupIds || (exports.UserNotificationLookupIds = {}));
//# sourceMappingURL=shared.enums.js.map