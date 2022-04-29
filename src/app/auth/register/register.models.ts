export enum OrganizationTypes {
  ReligiousOrganization,
  Education,
  Sports,
  RecreationalGroup,
  Civic,
  Neighborhood,
  Scouts,
  Other,
  Communities,
  Hospitals,
  RealEstate,
  Staffing,
  MoveMountains,
  Utilities,
  NonProfit,
}

export const OrganizationTypeNames = {
  [OrganizationTypes.ReligiousOrganization]: 'Religious Organization',
  [OrganizationTypes.Education]: 'Education',
  [OrganizationTypes.Sports]: 'Sports',
  [OrganizationTypes.RecreationalGroup]: 'Recreational Group',
  [OrganizationTypes.Civic]: 'Civic',
  [OrganizationTypes.Neighborhood]: 'Neighborhood',
  [OrganizationTypes.Scouts]: 'Scouts',
  [OrganizationTypes.Other]: 'Other',
  [OrganizationTypes.Communities]: 'Communities',
  [OrganizationTypes.Hospitals]: 'Hospitals',
  [OrganizationTypes.RealEstate]: 'Real Estate',
  [OrganizationTypes.Staffing]: 'Staffing',
  [OrganizationTypes.MoveMountains]: 'Move The Mountain Ministries',
  [OrganizationTypes.Utilities]: 'Utilities',
  [OrganizationTypes.NonProfit]: 'NonProfit',
};

export enum SignUpEnum {
  Default = 1,
  Google,
  Facebook,
}

export interface RegisterModelDto {
  accessCode: string;
  password: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
  organizationSubTypesValue: number;
  organizationTypesValue: OrganizationTypes;
  organizationName: string;
  referralCode?: string;
  userPhoneNumber: string;
  webUserName: string;
  isTrialRegistration: boolean;
  howYouFoundOutAboutUsId: number;
  signUpType: number;
  packageId: number;
  loginMethod: number;
  usePhoneNumberAsId?: boolean; // as on test website request
}

export interface RegisterFormModel {
  password: string;
  emailAddress: string;
  firstName: string;
  organizationTypesValue: OrganizationTypes;
  userPhoneNumber: string;
  agreeCheck: boolean;
}

// tslint:disable-next-line: no-empty-interface
export interface RegisterState {}
