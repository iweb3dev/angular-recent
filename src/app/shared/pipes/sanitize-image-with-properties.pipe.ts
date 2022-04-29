import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeImageWithProperties' })
export class SanitizeImageWithProperties implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(image: string, fileName: string): SafeResourceUrl {
    if (!image) {
      return '';
    }
    const [, type] = fileName.split('.');
    image = image ? `data:image\\${type};base64,${image}` : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
