import { Pipe, PipeTransform } from '@angular/core';
import { nonValue } from '../utils/verifications/value-check';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(
    value: unknown[],
    filterText: string = '',
    key?: string,
  ): any[] | string[] {
    if (nonValue(value)) {
      value = [];
    }

    return value.filter(
      (s) =>
        ((s[key] ?? s) as string)
          .toLowerCase()
          .indexOf(filterText.toLowerCase()) !== -1,
    );
  }
}
