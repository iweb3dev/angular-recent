import { ConnectedPosition } from '@angular/cdk/overlay';
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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true,
    },
  ],
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  searchControl = new FormControl(null);

  positions: ConnectedPosition[] = this._desktopPositions;
  @ViewChild('mobileInput', { static: false })
  private _mobileInput: ElementRef<HTMLInputElement>;

  @ViewChild('desktopInput', { static: false })
  private _desktopInput: ElementRef<HTMLInputElement>;

  @Output()
  valueChange = new EventEmitter<string>();

  private _isMobileView = window.innerWidth <= 600;
  private _overlayOpen = false;

  @Input()
  set isMobileView(isMobile: boolean) {
    if (!isMobile) {
      return;
    }
    this._isMobileView = isMobile;
    this.positions = this._mobilePositions;
  }

  @Input()
  set value(value: string) {
    this.searchControl.setValue(value);
  }

  get value(): string {
    return this.searchControl.value;
  }

  @Input()
  disabled = false;

  get isMobileView(): boolean {
    return this._isMobileView;
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
    if (isDisabled) {
      this.searchControl.disable();
      this.disabled = true;
    } else {
      this.searchControl.enable();
      this.disabled = false;
    }
  }

  set isOpen(open: boolean) {
    this._overlayOpen = open;
  }

  get isOpen(): boolean {
    return this._overlayOpen;
  }

  ngOnInit(): void {}

  focusInputElement(): void {
    this._mobileInput.nativeElement.focus();
  }

  openSearchField(): void {
    this.isOpen = !this.isOpen;

    requestAnimationFrame(() => {
      if (this._desktopInput && this.isOpen) {
        this._desktopInput.nativeElement.focus();
      }
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.emitNewValue();
  }

  onCloseMobileSearch(): void {
    this.isOpen = false;
    this.value = '';
    this.emitNewValue();
  }

  private get _desktopPositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center',
        offsetX: 0,
        offsetY: 0,
      },
    ];
  }

  private get _mobilePositions(): ConnectedPosition[] {
    return [
      {
        originX: 'start',
        originY: 'center',
        overlayX: 'center',
        overlayY: 'center',
        offsetX: 20,
        offsetY: 5,
      },
    ];
  }

  private emitNewValue(): void {
    this.valueChange.emit(this.value);

    if (this._onChangeCb) {
      this._onChangeCb(this.value);
    }
  }
}
