import { FormControl } from '@angular/forms';
import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss'],
})
export class GroupSearchComponent implements OnInit, OnDestroy {
  @Input() mobileView: boolean;
  @Input() inputPlaceHolder: string;
  @Input() searchDebounceLimit = 1000;

  @Output() searchChange: EventEmitter<string>;
  @Output() searchShown: EventEmitter<boolean>;

  @ViewChild('searchControl', { static: false }) searchControl: ElementRef;

  public searchInput: FormControl;
  public showSearchInput: boolean;

  private subscription$: Subscription;

  constructor() {
    this.searchInput = new FormControl('');
    this.subscription$ = new Subscription();
    this.searchShown = new EventEmitter<boolean>();
    this.searchChange = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.setSearchInput();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private setSearchInput(): void {
    this.subscription$.add(
      this.searchInput.valueChanges
        .pipe(debounceTime(this.searchDebounceLimit), distinctUntilChanged())
        .subscribe((value: string) => this.searchChange.emit(value))
    );
  }

  public searchOnClick(): void {
    this.showSearchInput = !this.showSearchInput;
    this.searchShown.emit(this.showSearchInput);

    if (this.showSearchInput) {
      setTimeout(() => this.searchControl.nativeElement.focus());
    }
  }
}
