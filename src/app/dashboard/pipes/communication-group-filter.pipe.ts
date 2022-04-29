import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'communicationGroupFilter' })
export class CommunicationGroupFilterPipe implements PipeTransform {
  transform(groups: Array<string>): string {
    const [group] = groups;
    return group;
  }
}
