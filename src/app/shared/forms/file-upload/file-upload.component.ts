import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  fileUploadControl = new FormControl([]);

  private _onTouchedCb: () => void;
  private _onChangeCb: (value: File[]) => void;

  @Input()
  name: string;

  @Input()
  multi = false;

  @Input()
  maxSize = Number.MAX_SAFE_INTEGER;

  @Input()
  fileUploadError: string;

  constructor() {}

  @Input()
  set value(value: File[]) {
    if (!value) {
      return;
    }
    if (!Array.isArray(value)) {
      value = [value];
    }
    this.fileUploadControl.setValue(value);
    this.emitNewValue();
  }

  get value(): File[] {
    return this.fileUploadControl.value;
  }

  get fileNames(): string[] {
    return this.value.map((value) => value.name);
  }

  @Output()
  fileUpload = new EventEmitter<File[]>();

  @Output()
  fileRemove = new EventEmitter<number>();

  @Output()
  fileTooLargeError = new EventEmitter<string>();

  writeValue(value: File[]): void {
    this.value = value;
  }

  registerOnChange(fn: (value: File[]) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  ngOnInit(): void {}

  onFileUpload(event): void {
    const [file]: File[] = Array.from(event.target.files);

    if (file.size / 1024 > this.maxSize) {
      this.fileTooLargeError.emit(file.name);

      return;
    }
    this.value = this.multi ? [...this.value, file] : [file];
    event.target.value = '';
  }

  onFileRemove(event: Event, index: number): void {
    const newItems = [];
    for (let i = 0; i < this.value.length; i++) {
      if (i === index) {
        continue;
      }
      newItems.push(this.value[i]);
    }
    this.fileUploadControl.setValue(newItems);
    this.fileRemove.emit(index);
    event.preventDefault();
  }

  onChangeFiles(): void {
    this.fileUploadControl.setValue([]);
  }

  private emitNewValue(): void {
    this.fileUpload.emit(this.value);
    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}
