import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AbsPipe } from './abs.pipe';
import { FilterPipe } from './filter.pipe';
import { SafeHtml } from './safe-html.pipe';
import { StringifyPipe } from './stringify.pipe';
import { SanitizeImage } from './sanitize-image.pipe';
import { AddTimeZoneAbbr } from './time-zone-abbr.pipe';
import { PipeFunctionPipe } from './pipe-function.pipe';
import { DecimalPointPipe } from './decimal-point.pipe';
import { PhoneNumberFormatPipe } from './phone-number-format.pipe';
import { ConvertTimeToTimeZone } from './convert-time-to-time-zone.pipe';
import { SanitizeImageWithProperties } from './sanitize-image-with-properties.pipe';

@NgModule({
  declarations: [
    AbsPipe,
    SafeHtml,
    FilterPipe,
    SanitizeImage,
    StringifyPipe,
    AddTimeZoneAbbr,
    DecimalPointPipe,
    PipeFunctionPipe,
    ConvertTimeToTimeZone,
    PhoneNumberFormatPipe,
    SanitizeImageWithProperties,
  ],
  exports: [
    AbsPipe,
    SafeHtml,
    FilterPipe,
    SanitizeImage,
    StringifyPipe,
    AddTimeZoneAbbr,
    DecimalPointPipe,
    PipeFunctionPipe,
    PhoneNumberFormatPipe,
    ConvertTimeToTimeZone,
    SanitizeImageWithProperties,
  ],
  providers: [DatePipe, ConvertTimeToTimeZone],
})
export class PipesModule {}
