import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TableVirtualScrollStrategy } from './virtual-table-scroll-strategy';
import { VirtualTableColDef } from './virtual-table.models';

@Component({
  selector: 'app-virtual-table',
  templateUrl: './virtual-table.component.html',
  styleUrls: ['./virtual-table.component.scss'],
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: TableVirtualScrollStrategy,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualTableComponent implements OnInit, OnDestroy {
  static BUFFER_SIZE = 3;
  rowHeight = 48;
  headerHeight = 56;
  gridHeight = 500;

  displayedColumns: string[] = [];

  @Input()
  set columnDefinitions(columnDefinitions: VirtualTableColDef[]) {
    this._columnDefinitions = columnDefinitions;
    this.displayedColumns = columnDefinitions.map((def) => def.displayedColumn);
  }

  get columnDefinitions(): VirtualTableColDef[] {
    return this._columnDefinitions;
  }

  loadingData = true;

  @Input()
  set dataSource(dataSource: unknown[]) {
    this._dataSource$.next(dataSource);
  }

  @Output()
  sortChanged = new EventEmitter<Sort>();

  dataSource$: Observable<unknown[]>;

  private _dataSource$ = new BehaviorSubject<unknown[]>([]);
  private _columnDefinitions = [];

  constructor(
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private readonly scrollStrategy: TableVirtualScrollStrategy,
  ) {}

  ngOnDestroy(): void {
    this._dataSource$.complete();
  }

  ngOnInit(): void {
    const range =
      Math.ceil(this.gridHeight / this.rowHeight) +
      VirtualTableComponent.BUFFER_SIZE;

    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    this.dataSource$ = combineLatest([
      this._dataSource$,
      this.scrollStrategy.scrolledIndexChange,
    ]).pipe(
      map(([data, scrollIndex]) => {
        const start = Math.max(
          0,
          scrollIndex - VirtualTableComponent.BUFFER_SIZE,
        );
        const end = Math.min(data.length, scrollIndex + range);

        return data.slice(start, end);
      }),
    );
  }
}
