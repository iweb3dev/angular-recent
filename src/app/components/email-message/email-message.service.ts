import { Injectable, NgZone } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilesService } from 'src/app/api/files/files.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { FileUploadDto } from 'src/app/shared/models/file/file-upload.models';
import { EmailMessageModel } from 'src/app/shared/models/message/message.models';

@Injectable()
export class EmailMessageService {
  constructor(
    private _ngZone: NgZone,
    private _toastService: ToastService,
    private _filesService: FilesService,
  ) {}

  exportUnLayerHtml(
    editor: EmailEditorComponent,
  ): Observable<Partial<EmailMessageModel>> {
    return this.fetchUnLayerObservable(editor).pipe(
      map((data) => ({
        emailBody: data.html,
        emailJson: JSON.stringify(data.design),
      })),
    );
  }

  openFileTooLargeError(filename: string): void {
    this._toastService.addToast(
      ToastType.Error,
      `File selected ${filename} is too large. Max file size is 2MB`,
    );
  }

  uploadEmailAttachments(
    file: File,
    userId: number,
  ): Observable<FileUploadDto> {
    return this._filesService.uploadAttachments(file, userId);
  }

  private fetchUnLayerObservable(
    editor: EmailEditorComponent,
  ): Observable<any> {
    return new Observable((observer) => {
      this._ngZone.run(() => {
        editor.exportHtml((data) => {
          observer.next(data);
          observer.complete();
        });
      });
    });
  }
}
