import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-search-expanded',
  templateUrl: './search-expanded.component.html',
  styleUrls: ['./search-expanded.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchExpandedComponent,
      multi: true,
    },
  ],
})
export class SearchExpandedComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: false })
  private _input: ElementRef<HTMLInputElement>;

  searchControl = new FormControl(null);

  @Input()
  label: string;

  @Output()
  valueChange = new EventEmitter<string>();

  @Input()
  set value(value: string) {
    this.searchControl.setValue(value);
  }

  get value(): string {
    return this.searchControl.value;
  }

  private _onTouchedCb: () => void;
  private _onChangeCb: (value: string) => void;
  constructor() {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}

  focusSearchField(): void {
    requestAnimationFrame(() => {
      this._input.nativeElement.focus();
    });
  }

  onValueChange(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this._onChangeCb) {
      this._onChangeCb(target.value);
    }

    this.valueChange.emit(target.value);
  }
}
