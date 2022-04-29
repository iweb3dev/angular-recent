import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetConfig,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilesService } from 'src/app/api/files/files.service';
import {
  ToastService,
  ToastType,
} from 'src/app/shared/components/toast/service/toast.service';
import { VerifyPhoneDesktopComponent } from 'src/app/shared/components/verify-phone/desktop/verify-phone.component';
import { VerifyPhoneMobileComponent } from 'src/app/shared/components/verify-phone/mobile/verify-phone.component';
import {
  FileUploadDto,
  FileUploadModel,
} from 'src/app/shared/models/file/file-upload.models';

@Injectable()
export class VoiceMessageService {
  constructor(
    private _matDialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private _toastService: ToastService,
    private _filesService: FilesService,
  ) {}

  openVoiceMessageBottomSheet<T>(
    component: ComponentType<T>,
    options: MatBottomSheetConfig,
  ): MatBottomSheetRef<T> {
    return this._bottomSheet.open<T>(component, {
      ...options,
      backdropClass: 'bottom-sheet-backdrop',
      panelClass: 'bottom-sheet-container',
    });
  }

  openVoiceMessageDialog<T>(
    component: ComponentType<T>,
    options = {},
  ): MatDialogRef<T> {
    return this._matDialog.open(component, {
      ...this.defaultDialogOptions,
      ...options,
    });
  }

  uploadMicrophoneFile(
    file: string | ArrayBuffer,
    userId: number,
  ): Observable<FileUploadModel> {
    return this._filesService
      .microphoneFileUpload(file, userId)
      .pipe(map((data) => this.createMicrophoneFileModel(data)));
  }

  uploadWavFile(file: File, userId: number): Observable<FileUploadModel> {
    return this._filesService
      .uploadMessagesFile(file, userId)
      .pipe(map((data) => this.createMicrophoneFileModel(data)));
  }

  openErrorSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Error, message);
  }

  openSuccessSnackbar(message: string): void {
    this._toastService.addToast(ToastType.Success, message);
  }

  openCallerIdVerifyDialog(): Observable<void> {
    return this._matDialog
      .open(VerifyPhoneDesktopComponent, { width: '570px' })
      .afterClosed();
  }

  openCallerIdVerifyBottomSheet(): Observable<void> {
    return this._bottomSheet
      .open(VerifyPhoneMobileComponent, {
        backdropClass: 'bottom-sheet-backdrop',
        panelClass: 'bottom-sheet-container',
      })
      .afterDismissed();
  }

  openValidatorToast(): void {
    this._toastService.createValidatorToast(
      'We are still currently creating your message. Please try again later',
      'Audio file not ready!',
    );
  }

  fetchTtsVoiceData(message: string): Observable<string> {
    return this._filesService.fetchTtsVoiceData(message);
  }

  private get defaultDialogOptions(): MatDialogConfig {
    return {
      height: '380px',
      width: '580px',
      disableClose: true,
    };
  }

  private createMicrophoneFileModel(data: FileUploadDto): FileUploadModel {
    const fileNameData = data.fileName.split('\\');
    const fileName = fileNameData[fileNameData.length - 1];
    const fileExtension = fileName.split('.')[1];

    return {
      fileExtension,
      fileName: data.attachmentFilePath,
      id: data.id,
      size: data.fileSize,
    };
  }
}
