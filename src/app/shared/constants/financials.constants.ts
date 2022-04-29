import {
  BankAccountTypes,
  CardTypes,
  PackageTypeIds,
  TransactionTypes,
} from 'src/app/api/shared/shared.enums';

export const CartTypesLabels = {
  [CardTypes.visa]: 'Visa',
  [CardTypes.masterCard]: 'MasterCard',
  [CardTypes.discover]: 'Discover',
  [CardTypes.americanExpress]: 'American Express',
  [CardTypes.dinersClub]: 'Diners Club',
  [CardTypes.jcb]: 'JCB',
  [CardTypes.enroute]: 'En Route',
  [CardTypes.unknown]: 'Unknown Card',
};

export const BankAccountTypeLabels = {
  [BankAccountTypes.checking]: 'Checking',
  [BankAccountTypes.savings]: 'Savings',
  [BankAccountTypes.businessChecking]: 'Business Checking',
};

export const TransactionTypesLabels = {
  [TransactionTypes.Unknown]: 'Unknown',
  [TransactionTypes.Purchase]: 'Purchase',
  [TransactionTypes.User]: 'User',
  [TransactionTypes.Transferred]: 'Transferred',
  [TransactionTypes.Received]: 'Received',
  [TransactionTypes.CreditBack]: 'Credit Back',
  [TransactionTypes.CancelOrder]: 'Cancel Order',
  [TransactionTypes.Advance]: 'Advance',
  [TransactionTypes.PaymentProcessing]: 'Payment Processing',
  [TransactionTypes.PackageChangeAdjustmentUp]: 'Package Change Adjustment Up',
  [TransactionTypes.FreeBonus]: 'Free Bonus',
  [TransactionTypes.FreeMonthly]: 'Free Monthly',
  [TransactionTypes.ReferralBonus]: 'Referral Bonus',
  [TransactionTypes.PackageChangeAdjustmentDown]:
    'Package Change Adjustment Down',
  [TransactionTypes.CreditsDuration]: 'Credits Duration',
};

export const PackageLabels = {
  [PackageTypeIds.Essentials]: 'Essentials',
  [PackageTypeIds.Freemium]: 'Freemium',
  [PackageTypeIds.MonthlyCredits]: 'MonthlyCredit',
  [PackageTypeIds.PayAsYouGo]: 'PayAsYouGo',
  [PackageTypeIds.Premium]: 'Premium',
  [PackageTypeIds.Standard]: 'Standard',
  [PackageTypeIds.Unlimited]: 'Unlimited',
};
