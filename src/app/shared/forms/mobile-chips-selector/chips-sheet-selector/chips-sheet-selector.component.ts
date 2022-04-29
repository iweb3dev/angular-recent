import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { hasValue } from 'src/app/shared/utils/verifications/value-check';

@Component({
  selector: 'app-chips-sheet-selector',
  templateUrl: './chips-sheet-selector.component.html',
  styleUrls: ['./chips-sheet-selector.component.scss'],
})
export class ChipsSheetSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: false })
  private _input: ElementRef<HTMLInputElement>;

  searchControl = new FormControl(null);

  chipsOptions$: Observable<{ id: number; value: string }[]>;

  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { options: { id: number; value: string }[], customOption: string },
    private _matBottomSheetRef: MatBottomSheetRef,
  ) {}

  ngOnInit(): void {
    this.chipsOptions$ = this.searchControl.valueChanges.pipe(
      takeUntil(this._destroy$),
      startWith(''),
      map((value) => (value?.value ? value : { value })),
      map(({ value }) =>
        hasValue(value) ? this.filterCredits(value) : this.data.options,
      ),
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  openSearchField(): void {
    requestAnimationFrame(() => {
      this._input.nativeElement.focus();
    });
  }

  onSelect(item: { id: number; value: string }): void {
    this._matBottomSheetRef.dismiss(item);
  }

  onCustomOptionSelect(): void {
    this._matBottomSheetRef.dismiss({ customOption: true });
  }

  private filterCredits(value: string): { id: number; value: string }[] {
    const filterValue = value.toLowerCase();

    return this.data.options.filter((option) =>
      option.value.toLowerCase().includes(filterValue),
    );
  }
}
