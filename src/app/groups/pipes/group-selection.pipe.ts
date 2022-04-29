import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'selectedGroup' })
export class GroupSelectionPipe implements PipeTransform {
  transform(groupId: number, selectedGroups: Array<number>): boolean {
    return selectedGroups.findIndex((id) => id === groupId) > -1 ? true : false;
  }
}
