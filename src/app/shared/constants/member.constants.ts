import { RequestPagingFiltering } from 'src/app/api/members/members.models';

import {
  MemberSortDescriptors,
  DefaultMemberSearchFilter,
} from '../components/member/enums/member-search-filter.enum';

export const MemberSortFilterTypes: Array<{ key: string; value: string }> = [
  {
    key: 'First Name - Ascending',
    value: 'FirstName ASC',
  },
  {
    key: 'First Name - Descending',
    value: 'FirstName DESC',
  },
  {
    key: 'Last Name - Ascending',
    value: 'LastName ASC',
  },
  {
    key: 'Last Name - Descending',
    value: 'LastName DESC',
  },
  {
    key: 'Phone Number - Ascending',
    value: 'PhoneNumber ASC',
  },
  {
    key: 'Phone Number - Descending',
    value: 'PhoneNumber DESC',
  },
  {
    key: 'Email Address - Ascending',
    value: 'firstEmailAddress ASC',
  },
  {
    key: 'Email Address - Descending',
    value: 'firstEmailAddress DESC',
  },
  // It's should be useful to making sortable column below in member-virtual-table-desktop component.
  // {
  //  key: 'Callable - Ascending',
  //  value: 'ShortCodeSMSStatus ASC',
  // },
  // {
  //  key: 'Callable - Descending',
  //  value: 'ShortCodeSMSStatus DESC',
  // },
  // {
  //  key: 'Textable - Ascending',
  //  value: 'TollFreeSMSStatus ASC',
  // },
  // {
  //  key: 'Textable - Descending',
  //  value: 'TollFreeSMSStatus DESC',
  // },
  // {
  //  key: 'Emailable - Ascending',
  //  value: 'emailable ASC',
  // },
  // {
  //  key: 'Emailable - Descending',
  //  value: 'emailable DESC',
  // },
  {
    key: 'Active - Ascending',
    value: 'IsActive ASC',
  },
  {
    key: 'Active - Descending',
    value: 'IsActive DESC',
  },
];

export const MemberSearchFilter: RequestPagingFiltering = {
  filters: [],
  pageSize: DefaultMemberSearchFilter.PageSize,
  pageNumber: DefaultMemberSearchFilter.PageNumber,
  requestInt: DefaultMemberSearchFilter.RequestInt,
  sortExpression: MemberSortDescriptors.LastNameAsc,
};
