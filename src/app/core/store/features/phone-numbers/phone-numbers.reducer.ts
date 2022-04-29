import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  getAllPhoneNumbersResolve,
  showDeleteSelection,
  selectAllPhoneNumbersForDelete,
  setPhoneNumberForDelete,
  setPhoneNumbers
} from './phone-numbers.actions';
import { PhoneNumbers } from './phone-numbers.models';

export const phoneNumbersSlice = 'phoneNumbers';

const phoneNumbersAdapter: EntityAdapter<PhoneNumbers> = createEntityAdapter<PhoneNumbers>({
  selectId: (phoneNumber: PhoneNumbers) => phoneNumber.id
 });

export interface PhoneNumbersState extends EntityState<PhoneNumbers> {
  showDeleteSelection: boolean;
}

export const initialState = phoneNumbersAdapter.getInitialState({
  showDeleteSelection: false
});

const phoneNumbersReducer = createReducer(
  initialState,
  on(setPhoneNumbers, (state,  { phoneNumbers }) =>  phoneNumbersAdapter.setAll(phoneNumbers, state)),
  on(
    getAllPhoneNumbersResolve,
    (state, {phoneNumbers}) => phoneNumbersAdapter.setAll(phoneNumbers, state)
    ),
  on(showDeleteSelection, (state, action) => {
    return {
      ...state,
      showDeleteSelection: action.show
    };
  }),
  on(selectAllPhoneNumbersForDelete, (state, action) => {
    return phoneNumbersAdapter.map((phoneNumber) => ({
      ...phoneNumber,
      flaggedForDeletion: action.shouldSelect
    }), state);
  }),
  on(setPhoneNumberForDelete, (state, action) => {
    return phoneNumbersAdapter.updateOne(action.update, state);
  })
);


export function reducer(state: PhoneNumbersState , action: Action) {
  return phoneNumbersReducer(state, action);
}


const {
  selectAll,
  selectTotal,
} = phoneNumbersAdapter.getSelectors();

// select the array of phone numbers
export const selectAllPhoneNumbers = selectAll;

// select the total phone numbers count
export const selectPhoneNumbersTotal = selectTotal;


