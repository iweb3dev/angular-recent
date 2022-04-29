// Response Interfaces
export interface AdditionalCredit {
  id: number;
  creditCount: number;
  cost: number;
  version: number;
}

export interface PrePayOption {
  id: number;
  prePayMonths: number;
  discount: number;
  isUpgradeOption: boolean;
  isExtendOption: boolean;
  displayOrder: number;
  displayString: string;
}

export interface FilterField {
  id: string;
  filterFieldName: string;
  isAdditionalField: boolean;
  acceptedDataType: number;
}

export interface Organizations {
  orgTypeID: number;
  orgType: string;
  orgSubTypes: OrganizationSubType;
}

export interface OrganizationSubType {
  orgSubTypeID: number;
  orgSubType: string;
}

export interface TimeZones {
  id: number;
  timeZoneID: string;
  displayName: string;
  supportsDayLightSavingTime: boolean;
  isAvailable: boolean;
  utcOffSet: string;
  utcOffSetAsTimeSpan: string;
  TimeZoneAbbreviation: string;
}

export interface GlobalSettingsKvpById {
  [key: string]: string;
}

export interface GlobalSettingValueById {
  settingID: number;
}

export interface ImportMappingField {
  fieldId: number;
  isAdditionalField: boolean;
  importColumnNumber: number;
  fieldName: string;
  doNotImport: boolean;
  acceptedNames: string[];
  allowMultiples: boolean;
  identifier: string;
  importQueueId: number;
  mfa_UserImport_ID: number;
  importFieldName: string;
  alreadyUsed: boolean;
  modifiedByID: number;
}

export interface ImportMappingFields extends ImportMappingField {
  id: number;
}

export interface HelpTopic {
  item1: string;
  item2: string;
}
