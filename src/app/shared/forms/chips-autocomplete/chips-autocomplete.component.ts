import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  EventEmitter,
  HostBinding,
  HostListener,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ChipsAutocompleteComponent },
  ],
})
export class ChipsAutocompleteComponent implements OnInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  autocompleteControl = new FormControl('');
  autocompleteOptions$: Observable<{ id: number; value: string }[]>;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'app-chips-autocomplete';

  private _chips = [];
  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  private _options = [];

  @Input()
  customOption: string;

  @Input()
  set autocompleteOptions(options: { id: number; value: string }[]) {
    if (options) {
      this._options = options;
    }
  }

  @Input()
  optionsProvider: (searchTerm: string) => Observable<string[]>;

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  @Input()
  set value(value: { id: number; value: string }[]) {
    if (value) {
      this._chips = Array.isArray(value) ? value : [value];
    }
    this.emitNewValue();
    this.stateChanges.next();
  }

  get value(): { id: number; value: string }[] {
    return this._chips;
  }

  @Input()
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  get required(): boolean {
    return this._required;
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.value = [];
      this.autocompleteControl.disable();
    } else {
      this.autocompleteControl.enable();
    }
    this.stateChanges.next();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get empty(): boolean {
    return this.value.length < 1;
  }

  get errorState(): boolean {
    return this.ngControl.invalid && this.ngControl.touched;
  }

  @Output()
  autocompleteChange = new EventEmitter<string>();

  @Output()
  customOptionClick = new EventEmitter<void>();

  @Output()
  valueChange = new EventEmitter<{ id: number; value: string }[] | string>();

  @Output()
  blur = new EventEmitter();

  @HostBinding()
  id = `app-chips-autocomplete-${ChipsAutocompleteComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby')
  describedBy = '';

  @ViewChild('autocompleteInput')
  private _autocompleteInput: ElementRef<HTMLInputElement>;

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  private _autocompleteTrigger: MatAutocompleteTrigger;

  @ViewChild(MatAutocomplete)
  autocomplete: MatAutocomplete;

  private _onTouchedCb: () => void;
  private _onChangeCb: (
    value: { id: number; value: string }[] | string
  ) => void;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _fm: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>
  ) {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    _fm
      .monitor(_elementRef.nativeElement, true)
      .pipe(filter(() => !this._disabled))
      .subscribe((origin) => {
        if (this.focused && !origin) {
          this._onTouchedCb();
        }
        this.focused = !!origin;
        this.stateChanges.next();
      });
  }

  ngOnInit(): void {
    this.autocompleteOptions$ = this.autocompleteControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterAutocomplete(value))
    );
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._fm.stopMonitoring(this._elementRef.nativeElement);
  }

  onInputClick(): void {
    // ISSUE: https://github.com/angular/components/issues/3106
    this._autocompleteTrigger._onChange('');
    this._autocompleteTrigger.openPanel();
  }

  writeValue(value: { id: number; value: string }[]): void {
    this.value = value;
  }

  registerOnChange(fn: (value: { id: number; value: string }[]) => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouchedCb = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  onRemove(removeItem: number): void {
    this.value = this.value.filter((value) => value.id !== removeItem);
    if (!this.autocomplete.isOpen) {
      this.blur.emit();
    }
  }

  onAdd(event: MatChipInputEvent): void {
    const input = event.chipInput;
    const value = (event.value || '').trim();

    if (input) {
      input.clear();
    }

    if (this.valueExists(value)) {
      return;
    }

    if (!this._options.find((option) => option.value === event.value)) {
      return;
    }

    if (value) {
      const addedOption = this._options.find(
        (option) => option.value === event.value
      );

      this.value = [...this.value, addedOption];
    }
  }

  onBlur(): void {
    if (!this.autocomplete.isOpen) {
      this.blur.emit();
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this._autocompleteInput.nativeElement.value = '';

    if (this.valueExists(event.option.viewValue)) {
      return;
    }

    const addedOption = this._options.find(
      (option) => option.value === event.option.viewValue
    );

    this.value = [...this.value, addedOption];
  }

  onContainerClick(event: MouseEvent) {
    event.stopPropagation();
    this._autocompleteInput.nativeElement.focus();
    this.onInputClick();
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  private filterAutocomplete(value: string): { id: number; value: string }[] {
    const filterValue = value.toUpperCase();

    return this._options.filter((option) =>
      option.value.toUpperCase().includes(filterValue)
    );
  }

  private valueExists(currentValue: string): boolean {
    currentValue = currentValue.toUpperCase();

    return this.value.some(
      (selected) => selected.value.toUpperCase() === currentValue
    );
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);
    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}
