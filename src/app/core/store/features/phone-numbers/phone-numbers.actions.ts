import { createAction, props } from '@ngrx/store';
import { PhoneNumbers } from './phone-numbers.models';
import { Update } from '@ngrx/entity';

export const getAllPhoneNumbersStart = createAction('[Phone Numbers] Get All Start');
export const getAllPhoneNumbersResolve = createAction(
  '[Phone Numbers] Get All Resolve',
  props<{ phoneNumbers: PhoneNumbers[] }>(),
);
export const getAllPhoneNumbersError = createAction('[Phone Numbers] Get All Error');

export const showDeleteSelection = createAction(
  '[Phone Numbers Actions] Show Delete Selection',
  props<{ show: boolean }>(),
);

export const selectAllPhoneNumbersForDelete = createAction(
  '[Phone Numbers Actions] Select All For Delete',
  props<{ shouldSelect: boolean }>(),
);

export const setPhoneNumberForDelete = createAction(
  '[Phone Numbers Actions] Set Phone Number For Delete',
  props<{ update: Update<PhoneNumbers> }>()
);


export const deleteSelectedPhoneNumbers = createAction(
  '[Phone Numbers Actions] Delete Selected Phone Numbers',
);

export const setPhoneNumbers = createAction(
  '[Phone Numbers] Set Phone Numbers',
  props<{ phoneNumbers: PhoneNumbers[] }>(),
);

export const deleteAllPhoneNumbers = createAction(
  '[Phone Numbers Actions] Delete All Phone Numbers',
);

export const singlePhoneNumberDelete = createAction(
  '[Phone Numbers List] Single Phone Number Delete',
  props<{ id: number }>(),
);
