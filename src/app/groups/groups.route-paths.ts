export enum GroupsRoutePaths {
  Default = '',
  List = 'group/:id',
  CreateGroup = 'create',
  MemberEdit = 'group/:id1/member/:id2',
  MembersUpload = 'group/:id/members/import',
  MembersAddManually = 'group/:id/members/add-manually',
  MembersAddExisting = 'group/:id/members/add-existing',
}
