import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AllowedUploadExtensions } from '../upload.constants';

@Component({
  selector: 'app-upload-sheet',
  templateUrl: './upload-sheet.component.html',
  styleUrls: ['./upload-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadSheetComponent implements OnInit {
  fileUploadControl = new FormControl(null, [
    Validators.required,
    this.acceptOnlyWav(),
  ]);

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<UploadSheetComponent>,
  ) {}

  ngOnInit(): void {}

  onCloseDialog(): void {
    this._bottomSheetRef.dismiss();
  }

  onFileUpload(): void {
    const [file] = this.fileUploadControl.value;
    this._bottomSheetRef.dismiss(file);
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
