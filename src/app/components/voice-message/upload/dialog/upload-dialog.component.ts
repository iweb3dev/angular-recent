import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { AllowedUploadExtensions } from '../upload.constants';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDialogComponent implements OnInit {
  fileUploadControl = new FormControl(null, [
    Validators.required,
    this.acceptOnlyWav(),
  ]);

  constructor(private _dialogRef: MatDialogRef<UploadDialogComponent>) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._dialogRef.close();
  }

  onFileUpload(): void {
    const [file] = this.fileUploadControl.value;
    this._dialogRef.close(file);
  }

  private acceptOnlyWav(): ValidatorFn {
    return (control: FormControl): ValidationErrors => {
      const file = control.value;
      if (file) {
        const fileData = file[0].name.split('.');
        const extension = fileData[fileData.length - 1];

        return extension === AllowedUploadExtensions.Wav
          ? null
          : { invalidExtension: true };
      }

      return null;
    };
  }
}
