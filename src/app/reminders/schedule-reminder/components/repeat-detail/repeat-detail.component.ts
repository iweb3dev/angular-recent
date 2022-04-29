import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-repeat-detail',
  templateUrl: './repeat-detail.component.html',
  styleUrls: ['./repeat-detail.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RepeatDetailComponent),
            multi: true
    }
  ]
})
export class RepeatDetailComponent implements ControlValueAccessor {
  private valueChange$ = new Subject<string>();
  values = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  selectedValue = 'Monday';
  constructor() {}

  onSelectValue(value: string) {
    this.selectedValue = value;
    this.valueChange$.next(value);
  }

  writeValue(obj: string): void {
    this.selectedValue = obj;
  }
  registerOnChange(fn: any): void {
    this.valueChange$.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    // Implement when needed
  }
  setDisabledState?(isDisabled: boolean): void {
     // Implement when needed
  }
}
