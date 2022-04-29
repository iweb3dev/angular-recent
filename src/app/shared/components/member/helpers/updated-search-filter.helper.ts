import { RequestFilterValues } from 'src/app/api/members/members.models';

import { MemberListLimits } from 'src/app/shared/components/member/enums/member-list.enum';
import {
  LastNameFilterIds,
  FirstNameFilterIds,
  PhoneNumberFilterIds,
  LastNameFilterFields,
  FirstNameFilterFields,
  PhoneNumberFilterFields,
} from 'src/app/shared/components/member/enums/member-search-filter.enum';

export function updatedSearchFilter(searchValue = '') {
  let updatedFilter: Array<RequestFilterValues> = [];
  const isValidNumber = !isNaN(+searchValue);

  if (searchValue.length > 0) {
    updatedFilter = [
      {
        currentValue: searchValue,
        id: FirstNameFilterIds.Id,
        filterOrder: FirstNameFilterFields.FilterOrder,
        selectedAndOr: FirstNameFilterFields.SelectedAndOr,
        selectedFilterFieldID: FirstNameFilterIds.SelectedFilterFieldId,
        selectedAcceptedValue: FirstNameFilterFields.SelectedAcceptedValue,
        selectedComparisonOperator:
          FirstNameFilterFields.SelectedComparisonOperator,
      },
      {
        currentValue: searchValue,
        id: LastNameFilterIds.Id,
        filterOrder: LastNameFilterFields.FilterOrder,
        selectedAndOr: LastNameFilterFields.SelectedAndOr,
        selectedFilterFieldID: LastNameFilterIds.SelectedFilterFieldId,
        selectedAcceptedValue: LastNameFilterFields.SelectedAcceptedValue,
        selectedComparisonOperator:
          LastNameFilterFields.SelectedComparisonOperator,
      },
    ];

    if (isValidNumber) {
      updatedFilter.push({
        currentValue: searchValue,
        id: PhoneNumberFilterIds.Id,
        filterOrder: PhoneNumberFilterFields.FilterOrder,
        selectedAndOr: PhoneNumberFilterFields.SelectedAndOr,
        selectedFilterFieldID: PhoneNumberFilterIds.SelectedFilterFieldId,
        selectedAcceptedValue: PhoneNumberFilterFields.SelectedAcceptedValue,
        selectedComparisonOperator:
          PhoneNumberFilterFields.SelectedComparisonOperator,
      });
    }
  }

  return updatedFilter;
}
