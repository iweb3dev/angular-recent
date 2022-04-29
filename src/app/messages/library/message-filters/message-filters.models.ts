export enum DateFilterEnum {
  Asc = 'asc',
  Desc = 'desc',
}

export interface MessageTypeFilterModel {
  hasVoiceMessage: boolean;
  hasTextMessage: boolean;
  hasEmailMessage: boolean;
}
