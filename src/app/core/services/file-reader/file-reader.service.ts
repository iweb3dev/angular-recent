import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  private _reader: FileReader;

  constructor(private _ngZone: NgZone) {
    this._reader = new FileReader();
  }

  readFile(file: Blob): Observable<string | ArrayBuffer> {
    this._reader.readAsDataURL(file);

    return new Observable((observer) => {
      this._ngZone.run(() => {
        this._reader.onloadend = () => {
          observer.next(this._reader.result);
          observer.complete();
        };
        this._reader.onerror = () => observer.error();
      });
    });
  }

  readFileAsBinaryString(file: Blob): Observable<string | ArrayBuffer> {
    this._reader.readAsBinaryString(file);
    return new Observable((observer) => {
      this._ngZone.run(() => {
        this._reader.onloadend = () => {
          observer.next(this._reader.result);
          observer.complete();
        };
        this._reader.onerror = () => observer.error();
      });
    });
  }
}
