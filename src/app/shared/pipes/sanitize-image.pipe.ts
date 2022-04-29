import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'sanitizeImage' })
export class SanitizeImage implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(image: string): SafeResourceUrl {
    return image ? this.sanitizer.bypassSecurityTrustResourceUrl(image) : '';
  }
}
