import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'memberContactsCount' })
export class MemberContactsCountPipe implements PipeTransform {
  transform(count: number): string {
    return count > 1 ? `(+${count - 1} more)` : '';
  }
}
