export const membersImportFileTypes: Array<string> = ['xlsx', 'xls', 'cab'];

export const GroupSortFilterTypes: Array<{ key: string; value: string }> = [
  {
    key: 'Group Id',
    value: '0',
  },
  {
    key: 'Group Name - Ascending',
    value: '1',
  },
  {
    key: 'Group Name - Descending',
    value: '5',
  },
  {
    key: 'Member Count - Ascending',
    value: '6',
  },
  {
    key: 'Member Count - Descending',
    value: '2',
  },
  {
    key: 'Group Creation - Descending',
    value: '3',
  },
  {
    key: 'Last Accessed - Descending',
    value: '4',
  },
];

export const GroupMemberDefaultImportMapping = {
  fieldId: 0,
  identifier: '-1',
  fieldName: '---Select Option---',
};
