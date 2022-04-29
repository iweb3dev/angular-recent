export enum SentViaTypes {
  unknown = 0,
  web = 1,
  phone = 2,
}

export enum UserSystemSettingCategories {
  privacy = 0,
  mapping = 1,
  system = 2,
}

export enum PasswordResetResult {
  email = 0,
  phone = 1,
  resetFailed = 2,
  classicAccount = 3,
}

export enum PhoneVerificationStatuses {
  unknown = 0,
  processing = 1,
  sendingcall = 2,
  verified = 3,
  notVerified = 4,
  answered = 5,
}

export enum CommunicationStatsTimePeriod {
  allTime = 0,
  last7Days = 1,
  lastMonth = 2,
  lastSixMonths = 3,
}

export enum BuildCommunicationResults {
  failed_InsufficientCredits = 1,
  failed_MoveFiles = 2,
  failed_PutOnHold = 3,
  failed_Exception = 4,
  success = 5,
  success_AutoBilled = 6,
  failed_NoEndpoints = 7,
}

export enum NotificationStatusTypes {
  unknown = 0,
  scheduled = 1,
  started = 2,
  cancelled = 3,
  paused = 4,
  completed = 5,
  ended = 6,
}

export enum MessageHistoryTypes {
  inProgress = 0,
  completed = 1,
  cancelled = 2,
  all = 3,
  scheduled = 4,
}

export enum CommunicationEndpointTypes {
  phone = 1,
  sms = 2,
  email = 3,
  fax = 4,
}

export enum IsActiveStatuses {
  deactive = 0,
  active = 1,
  both = 2,
}

export enum GroupMemberStatuses {
  unknown = 0,
  pendingApproval = 1,
  noApprovalRequired = 2,
  approved = 3,
  denied = 4,
  removed = 5,
}

export enum SMSStatuses {
  unknown = 0,
  optinRequestSent = 1,
  optedIn = 2,
  optedOut = 3,
  optedOutGlobal = 4,
  unTextable = 5,
  custom = 6,
}

export enum AddressLocations {
  other = 0,
  home = 1,
  work = 2,
}

export enum AddressStatuses {
  valid = 1,
  unknown = 2,
  invalid = 3,
}

export enum PhoneNumberTypes {
  unknown = 0,
  voice = 1,
  boughtPhoneNumber = 2,
  callerID = 4,
}

export enum PhoneNumberLocations {
  other = 0,
  home = 1,
  work = 2,
  mobile = 3,
}

export enum PhoneNumberStatuses {
  valid = 1,
  unknown = 2,
  invalid = 3,
}

export enum EmailAddressStatuses {
  valid = 1,
  unknown = 2,
  invalid = 3,
}

export enum EmailAddressLocations {
  other = 0,
  home = 1,
  work = 2,
}

export enum AddNewMemberResults {
  unknown = 0,
  addedMember = 1,
  addedUser = 2,
  requestSent = 3,
  conflictExists = 4,
  error = 5,
  approvalRequiredToJoin = 6,
  groupMemberLimitExceeded = 12,
}

export enum ImportMessageType {
  information = 1,
  warning = 2,
  error = 3,
}

export enum ImportFileTypes {
  unknown = 0,
  xls = 1,
  xlxs = 2,
  csv = 3,
  txt = 4,
  mdb = 5,
}

export enum MemberProfileSaveTypes {
  user = 0,
  phoneNumber = 1,
  emailAddress = 2,
  address = 3,
  additionalField = 4,
}

export enum SaveMemberEndpointResults {
  unknown = 0,
  successDelete = 1,
  successUpdate = 2,
  successInsert = 3,
  validationErrors = 4,
  error = 5,
  failedDueToassociation = 6,
}

export enum PaymentPrograms {
  creditCard = 0,
  bankCreditCard = 1,
  payPal = 2,
}

export enum BankAccountTypes {
  checking = 0,
  businessChecking = 1,
  savings = 2,
}

export enum CardTypes {
  unknown = 0,
  visa = 1,
  masterCard = 2,
  discover = 3,
  americanExpress = 4,
  dinersClub = 5,
  jcb = 6,
  enroute = 7,
}

export enum SubscriptionChangeTypes {
  upgrade = 1,
  downgrade = 2,
  suspend = 3,
  unsuspend = 4,
  prepay = 5,
  extend = 6,
  reActivate = 7,
  queueDowngrade = 8,
  trialPlan = 9,
}

export enum LineItemTypes {
  packageUpgrade = 1,
  credit = 2,
  packageRenewal = 3,
  packageRenewalPrepaid = 4,
  packageDowngrade = 5,
  pbx = 6,
  purchaseDomainName = 7,
  phoneNumber = 8,
  keywords = 9,
}

export enum PaymentTypes {
  creditCard = 0,
  echeck = 1,
  paperCheck = 2,
  freeOrder = 3,
  prePaidOrder = 4,
  unknown = 5,
  payPal = 6,
}

export enum AuthCaptureTypes {
  authorizationOnly = 0,
  captureOnly = 1,
  authCapture = 2,
}

export enum OrderTypes {
  Unknown = 0,
  AdditionalCredits = 1,
  FreeCredits = 2,
  Upgrade = 3,
  Extension = 4,
  Renewal = 5,
  Downgrade = 6,
  QueueDowngrade = 7,
  DomainNamePurchase = 8,
  PhoneNumber = 9,
  Keywords = 10,
}

export enum PaymentStatuses {
  complete = 0,
  pending = 1,
  pending_PaperCheck = 2,
  void = 3,
}

export enum ReminderFrequency {
  daily = 1,
  weekly = 2,
  monthly = 3,
  yearly = 4,
}

export enum EventTypes {
  simpleEvent = 0,
  signUpEvent = 1,
  volunteerRoleForEvent = 2,
  volunteerRoleForVolunteerSheet = 3,
}

export enum SignUpTypes {
  anyOne = 0,
  groupMembersOnly = 1,
  addToGroupOnSignUp = 2,
}

export enum EventReminderSendToTypes {
  signedUpMembers = 1,
  notSignedUpMembers = 2,
  me = 4,
}

export enum IntervalTypes {
  minutes = 0,
  hour = 1,
  day = 2,
  week = 3,
  month = 4,
  year = 5,
}

export enum EventStatuses {
  unknown = 0,
  inProgress = 1,
  notStarted = 2,
  completed = 3,
}

export enum EventMemberStatuses {
  unknown = 0,
  notSignedUp = 1,
  signedUp = 2,
}

export enum GivingFrequency {
  unknown = 0,
  daily = 1,
  weekly = 2,
  monthly = 3,
  yearly = 4,
}

export enum VolunteerSheetStatuses {
  unknown = 0,
  inProgress = 1,
  notStarted = 2,
  completed = 3,
}

export enum ReceiverAccountTypes {
  unknown = 0,
  payPal = 1,
  stripe = 2,
}

export enum AttachmentTypes {
  Unknown = 0,
  Email = 1,
  Fax = 2,
  Phone = 3,
}

export enum PublicGroupPageSaveType {
  All,
  PageContent,
  SiteColor,
  HeaderInfo,
  Suspend,
  GroupPicture,
  AboutUs,
  Footer,
  MapArea,
  Seo,
  Giving,
}

export enum MediaType {
  Image,
  Video,
  Document,
  Audio,
}

export enum PackageTypeIds {
  PayAsYouGo = 1,
  MonthlyCredits = 2,
  Unlimited = 3,
  Freemium = 4,
  Essentials = 5,
  Standard = 6,
  Premium = 7,
}

export enum TransactionTypes {
  Unknown = 0,
  Purchase = 1,
  User = 2,
  Transferred = 3,
  Received = 4,
  CreditBack = 5,
  CancelOrder = 6,
  Advance = 7,
  PaymentProcessing = 8,
  PackageChangeAdjustmentUp = 9,
  FreeBonus = 10,
  FreeMonthly = 11,
  ReferralBonus = 12,
  PackageChangeAdjustmentDown = 13,
  CreditsDuration = 14,
}

export enum CommunicationConfirmActionTypes {
  CommunicationConfirmed = 1,
  CommunicationCancelledIssueCredits = 2,
}

export enum UserNotificationLookupIds {
    UserWouldLikeToAddYouToHisGroup = 1,
    UserWouldLikeToBeAddedToYourGroup = 2,
    UserHasRemovedYouFromHisGroup = 3,
    UserHasRemovedHimselfFromYourGroup = 4,
    ImportResult = 6,
    FinancialNotification = 7,
    MapProcessingResult = 8,
    UserHasAddedYouToGroup = 9,
    UserHasBecomeAMemberOfYourGroup = 11,
    YouHaveBeenAddedToGroup = 12,
    MappingDataRetrieved = 13,
    UserSignedUpForEvent = 14,
    UserVolunteeredForRole = 15,
    YouHaveSignedUpForEvent = 16,
    YouHaveVolunteeredForRole = 17,
    ImportResultGroupCreateFailed = 18,
    ImportResultNoMembersImported = 19,
    ImportRestultInvalidFile = 20,
    CampaignProcessingResult = 21,
    InsufficentCreditsToSendReminder = 22,
    UnableToCreateReocurranceReminder = 23,
    InappropriateTopicOrComment = 24,
    ReferralCreditsGivenNotice = 25,
    CommunicationEndPointResponse = 26,
    UserSignedUpForEventNoPaymentOfEventCost = 27,
    UserSignedUpForEventWithPaymentOfEventCost = 28,
    importProgress = 29,
    UserSignedUpForGroupsEvent = 30,
    UserSignedUpForOpportunity = 31,
}
