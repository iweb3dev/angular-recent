import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorButtons } from './paginator.models';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit {
  readonly PaginatorButtons = PaginatorButtons;

  pagination: (number | PaginatorButtons)[];

  @Input()
  // index should be provided
  set pages(pages: number) {
    this._pagesLength = pages;
    this.pagination = this.createPagination(pages, 0);
  }

  get pages(): number {
    return this._pagesLength;
  }

  @Input()
  set activePage(page: number) {
    this._page = page;
    this.pagination = this.createPagination(this._pagesLength, page);
    this.pageChange.emit(this._page);
  }

  get activePage() {
    return this._page;
  }

  @Input()
  incrementStep = 2;

  @Input()
  decrementStep = 2;

  @Input()
  startEndItemsNumber = 4;

  @Output()
  pageChange = new EventEmitter<number>();

  private _page = 0;
  private _pagesLength: number;

  constructor() {}

  ngOnInit(): void {}

  stepBack(): void {
    if (!(this.activePage <= 0)) {
      this.activePage--;
    }
  }

  stepForward(): void {
    if (this.activePage !== this.pages) {
      this.activePage++;
    }
  }

  onIncrement(): void {
    if (this.activePage < this.startEndItemsNumber) {
      this.activePage = this.startEndItemsNumber;

      return;
    }
    this.activePage = this.activePage + this.incrementStep;
  }

  onDecrement(): void {
    if (this.activePage > this.pages - this.startEndItemsNumber) {
      this.activePage = this.pages - this.startEndItemsNumber;

      return;
    }
    this.activePage = this.activePage - this.decrementStep;
  }

  private createPagination(
    pagesNumber: number,
    activeItem: number,
  ): (number | PaginatorButtons)[] {
    if (pagesNumber <= 7) {
      return new Array(pagesNumber).fill(0).map((_, i) => i);
    }

    const pagination = new Array<number | PaginatorButtons>();

    const isInTheMiddle =
      activeItem >= this.startEndItemsNumber &&
      activeItem <= pagesNumber - this.startEndItemsNumber;
    const isAtTheBeginning = activeItem < this.startEndItemsNumber;
    const isAtTheEnd = activeItem > pagesNumber - this.startEndItemsNumber;

    if (isInTheMiddle) {
      pagination.push(
        0,
        ...this.createPaginationInBoundaries(activeItem, pagesNumber),
      );

      return pagination;
    }

    if (isAtTheBeginning) {
      for (let i = 0; i <= this.startEndItemsNumber; i++) {
        pagination.push(i);
      }

      pagination.push(PaginatorButtons.Increment, pagesNumber);

      return pagination;
    }

    if (isAtTheEnd) {
      pagination.push(0, PaginatorButtons.Decrement);

      for (
        let i = pagesNumber - this.startEndItemsNumber;
        i <= pagesNumber;
        i++
      ) {
        pagination.push(i);
      }

      return pagination;
    }
  }

  private createPaginationInBoundaries(
    activeItemIndex: number,
    pagesNumber: number,
  ): (number | PaginatorButtons)[] {
    return [
      PaginatorButtons.Decrement,
      activeItemIndex - 1,
      activeItemIndex,
      activeItemIndex + 1,
      PaginatorButtons.Increment,
      pagesNumber,
    ];
  }
}
