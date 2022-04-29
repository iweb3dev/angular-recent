import { Member } from 'src/app/api/members/members.models';

export interface GroupMemberEditResolverModel {
  member: Member;
  groupId: number;
  memberId: number;
}
