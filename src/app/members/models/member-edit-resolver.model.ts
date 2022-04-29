import { Member } from 'src/app/api/members/members.models';

export interface MemberEditResolvereModel {
  member: Member;
  memberId: number;
}
