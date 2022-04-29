import { Pipe, PipeTransform } from '@angular/core';

import { hasValue } from '../utils/verifications/value-check';

@Pipe({ name: 'stringify' })
export class StringifyPipe implements PipeTransform {
  transform(value: unknown[] | number | string, joinSeparator = ' , '): string {
    if (Array.isArray(value)) {
      return hasValue(value) ? value.join(joinSeparator) : '';
    } else {
      return hasValue(value) ? value.toString() : '';
    }
  }
}
