
export interface LookupsState {
  organizationTypes: OrganizationType[];
  timeZones: TimeZone[];
  helpTopics: HelpTopic[];
  globalLookupSettings: { [id: string]: string };
}

export class OrganizationType {
  orgTypeID: number;
  orgType: string;
  orgSubTypes: OrganizationSubType[];

  constructor(obj: Partial<OrganizationType>) {
    Object.assign(this, obj);
  }
}

export class OrganizationSubType {
  orgSubTypeID: number;
  orgSubType: string;

  constructor(obj: Partial<OrganizationSubType>) {
    Object.assign(this, obj);
  }
}

export class TimeZone {
  displayName: string;
  id: number;
  isAvailable: boolean;
  supportsDayLightSavingTime: boolean;
  timeZoneAbbreviation: string;
  timeZoneID: string;
  utcOffSet: string;
  utcOffSetAsTimeSpan: string;

  constructor(obj: Partial<TimeZone>) {
    Object.assign(this, obj);
  }
}

export class HelpTopic {
  title: string;
  detail: string;
  id: string;

  constructor(obj: Partial<HelpTopic>) {
    Object.assign(this, obj);
  }
}
