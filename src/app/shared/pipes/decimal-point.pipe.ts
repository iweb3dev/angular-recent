import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalPoint',
})
export class DecimalPointPipe implements PipeTransform {
  transform(value: number, defaultDecimalPointValue = '00'): string | number {
    return this.getDecimalFormattedValue(value, defaultDecimalPointValue);
  }

  private getDecimalFormattedValue(
    value: number,
    decimalPointValue: string
  ): string | number {
    const hasDecimal = `${value}`.includes('.');
    return hasDecimal ? value : `${value}.${decimalPointValue}`;
  }
}
