import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectedMember' })
export class MemberSelectionPipe implements PipeTransform {
  transform(memberId: number, selectedMembers: Array<number>): boolean {
    return selectedMembers.findIndex((id) => id === memberId) > -1
      ? true
      : false;
  }
}
