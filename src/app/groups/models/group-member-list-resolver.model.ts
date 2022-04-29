import { GroupWithStats } from 'src/app/api/groups/groups.models';
import { GroupMembersDisplay } from 'src/app/api/members/members.models';

export interface GroupMemberListResolvereModel {
  groupWithStats: GroupWithStats;
  groupMembersDisplay: GroupMembersDisplay;
}
