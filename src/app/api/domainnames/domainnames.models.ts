export interface Domain {
  name: string;
  isAvailable: boolean;
  isPremiumDomain: boolean;
  price: number;
  extension: string;
}

export interface EmailForwarders {
  myForwarderData: string;
}

export interface PurchaseDomain {
  domainName: string;
  description: string;
  customerProfileId: number;
  paymentProfileId: number;
  domainYearlyCost: number;
  numYears: number;
}
