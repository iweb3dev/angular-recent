import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(number) {
    let newStr = '';
    let i = 0;

    for (; i < Math.floor(number.length / 3); i++) {
      if (i > 1) {
        newStr = newStr + number.substr(i * 3, 4);
      } else {
        newStr = newStr + number.substr(i * 3, 3) + '-';
      }
    }

    return newStr;

  }

}
