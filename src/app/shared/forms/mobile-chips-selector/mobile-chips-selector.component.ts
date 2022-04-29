import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ChipsSheetSelectorComponent } from './chips-sheet-selector/chips-sheet-selector.component';

@Component({
  selector: 'app-mobile-chips-selector',
  templateUrl: './mobile-chips-selector.component.html',
  styleUrls: ['./mobile-chips-selector.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: MobileChipsSelectorComponent },
  ],
})
export class MobileChipsSelectorComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  static nextId = 0;
  chipsControl = new FormControl([]);

  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'app-mobile-chips-selector';

  @Input()
  customOption: string;

  @Input()
  set options(options: { id: number; value: string }[]) {
    this._options = options ?? [];
  }

  get options(): { id: number; value: string }[] {
    return this._options;
  }

  @Input()
  set value(value: any[]) {
    this.chipsControl.setValue(value ?? []);
    this.stateChanges.next();
  }

  get value() {
    return this.chipsControl.value;
  }

  @Input()
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  get placeholder(): string {
    return this._placeholder;
  }

  @Input()
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this._disabled) {
      this.value = [];
      this.chipsControl.disable();
    } else {
      this.chipsControl.enable();
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

  @HostBinding()
  id = `app-mobile-chips-selector-${MobileChipsSelectorComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby')
  describedBy = '';

  @Output()
  valueChange = new EventEmitter<{ id: number; value: string }[] | string>();

  @Output()
  customOptionClick = new EventEmitter<void>();

  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  private _options: { id: number; value: string }[];
  private _onTouchedCb: () => void;
  private _onChangeCb: (
    value: { id: number; value: string }[] | string,
  ) => void;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private _fm: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    private _matBottomSheet: MatBottomSheet,
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

  ngOnInit(): void {}

  ngOnDestroy() {
    this.stateChanges.complete();
    this._fm.stopMonitoring(this._elementRef.nativeElement);
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

  onContainerClick(event: MouseEvent) {
    this._matBottomSheet
      .open(ChipsSheetSelectorComponent, {
        data: { options: this.options, customOption: this.customOption },
      })
      .afterDismissed()
      .pipe(filter((value) => !!value))
      .subscribe((selectedItem) => {
        if (selectedItem.customOption) {
          this.customOptionClick.emit();
          return;
        }
        if (!this.value.some((value) => value.id === selectedItem.id)) {
          this.value = [...this.value, selectedItem];
          this.emitNewValue();
        }
      });
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onRemove(id: number): void {
    this.value = this.value.filter((item) => item.id !== id);
    this.emitNewValue();
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);
    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}
