import { CAPIBase } from '../shared/shared.models';
import {
  SubscriptionChangeTypes,
  PaymentTypes,
  PaymentStatuses,
  PackageTypeIds,
} from '../shared/shared.enums';
import { PrePayOption } from '../lookups/lookups.models';

export interface PackageFeatures extends CAPIBase {
  version: number;
  displayOrder: number;
  cost: number;
  monthlyCredits: number;
  additionalCreditDiscount: number;
  packageName: string;
  packageDescription: string;
  voiceMessage: boolean;
  emailMessage: boolean;
  smsMessage: boolean;
  callerID: boolean;
  afterHourMessaging: boolean;
  publicGroupPageLimit: number;
  eventTools: boolean;
  payPalIntegration: boolean;
  volunteerTools: boolean;
  mapping: boolean;
  demographicTools: boolean;
  pbx: boolean;
  groupLimit: number;
  membersPerGroupLimit: number;
  mappingReports: number;
  voiceMessageLength: number;
  multiLanguageMessages: boolean;
  twoWayTextSurveys: boolean;
  emailMessagingLimit: number;
  additionalMessageCost: number;
  eventVolunteer: boolean;
  sharedGroupAccess: boolean;
  dataStorage: string;
  keywords: number;
  smsLength: number;
  ttsLength: number;
  memberCount: number;
  rewardProgramAccess: boolean;
  keywordTrial: number;
  emailTemplates: boolean;
  rewardProgramMultiplier: number;
  reminders: boolean;
  trailer: string;
  straightToVoicemail: boolean;
  twentyFourSevenMessaging: boolean;
  liveAnswerTransfer: boolean;
  sendRecordingAsTextEmail: boolean;
  maxRecordingLength: number;
  afterHourMessagingCost: number;
  twentyFourSevenMessagingCost: number;
  reducedTrailer: boolean;
  reducedTrailerCost: number;
  noTrailer: boolean;
  noTrailerCost: number;
  liveAnswerTransferCost: number;
  straightToVoicemailCost: number;
  additionalKeywordCost: number;
  packageTypeId: PackageTypeIds;
  costType: string;
  emailCPBranding: boolean;
  emailMergeTags: boolean;
  wallMapDisplay: number;
  tollFreePhoneNumberCost: number;
  callForwardMinutes: number;
}

export interface PackageChange {
  subscriptionChangeType: SubscriptionChangeTypes;
  changeToPackageId: number;
  currentPackageId: number;
  prepayOptionId: number;
  promoCode: string;
  customerProfileId: number;
  paymentProfileId: number;
  isSettingUpForTrialPackage: boolean;
  receivedHalfOff: number;
  rewardMoneyBalance: number;
  suspendReason: number;
  isPayPal: boolean;
  createStep?: string;
  newPackageResults?: string;
}

export interface CPCPromoCode extends CAPIBase {
  code: string;
  codeType: number;
  codeDescription: string;
  startDate: Date;
  endDate: Date;
  isOneTimeUse: boolean;
  allowedUserId: number;
  discount: number;
  referralCodeId: number;
}

export interface BasePurchase {
  ownerID: number;
  ownerCurrentPackageID: number;
  description: string;
  promoCode: CPCPromoCode;
  paymentType: PaymentTypes;
  customerProfileID: number;
  emailAddress: string;
  paymentProfileID: number;
  cost?: number;
  creditAmount?: number;
  discountCost?: string;
  initialCost?: string;
}

export interface PurchaseCredits extends BasePurchase {
  additionalCreditsID: number;
  claimedMoneyBalance: number;
}

export interface BaseOrderReceiptLineItem extends CAPIBase {
  orderId: number;
  quantity: number;
  costPerItem: number;
  description: string;
}

export interface OrderReceipt {
  userId: number;
  wasDeclined: boolean;
  orderID: number;
  description: string;
  promoCode: string;
  profileIdUsed: number;
  subscriptionId: number;
  processDateTime: Date;
  postingDateTime: Date;
  invoiceNumber: string;
  transactionNumber: string;
  approvalCode: string;
  amountPaid: number;
  paymentStatus: PaymentStatuses;
  lineItems: BaseOrderReceiptLineItem[];
}

export interface PurchaseDomainName extends BasePurchase {
  domainYearlyCost: number;
  autoBill: boolean;
  domainName: string;
  numYears: number;
}

export interface SubscriptionChangeValidation {
  nextBillDate: Date;
  amountDueNow: number;
  amountDueNextCycle: number;
  priceBeforeDiscount: number;
}

export interface SubscriptionDowngrade extends SubscriptionChangeValidation {
  remainingBalance: number;
  additionalCredits: number;
  downgradeCreditLoss: number;
  mustRemoveGroups: boolean;
  mustRemoveMembers: boolean;
  groupsWithMembersThatExceedLimits: string[];
  mustRemoveNotifications: boolean;
  notificationsWithEmailText: string[];
  mustRemovePublicGroupPages: boolean;
  activePublicPages: string[];
  mustRemoveEvents: boolean;
  events: string[];
  mustRemovePaypalIntegration: boolean;
  PaymentPrograms: string[];
  volunteerSheets: string[];
  paymentType: PaymentTypes;
  months: number;
  canDowngrade: boolean;
}

export interface SubscriptionPrepay extends SubscriptionChangeValidation {
  additionalMonthlyCredits: number;
  paymentType: PaymentTypes;
  months: number;
  rewardMoneyUsed: number;
  PromotionSavings: number;
}

export interface SubscriptionUpgrade extends SubscriptionChangeValidation {
  remainingBalance: number;
  additionalCredits: number;
  additionalMonthlyCredits: number;
  paymentType: PaymentTypes;
  months: number;
  rewardMoneyUsed: number;
  promotionSavings: number;
}

// tslint:disable-next-line
export interface SubscriptionSuspendUnsuspend
  extends SubscriptionChangeValidation {}

export interface BaseSubscriptionChange {
  userId: number;
}

export interface BasePaymentProfile extends CAPIBase {
  paymentType: PaymentTypes;
  ownerId: number;
  customerProfileId: number;
  paymentProfileId: number;
  isPrimary: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  emailAddress: string;
  ccEmailAddress: string;
}

export interface SubscriptionChangeDowngrade extends BaseSubscriptionChange {
  downgradeToFeature: PackageFeatures;
  downgradePrePayOption: PrePayOption;
  paymentProfile: BasePaymentProfile;
  downgradeCreditLoss: number;
}

export interface SuspensionReasons {
  id: number;
  suspendReason: string;
  description: string;
}

export interface UpgradePackageDtoModel {
  successfullyUpgraded: boolean;
  totalDue: number;
  successful?: boolean;
}
