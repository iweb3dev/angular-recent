import {
  Input,
  OnInit,
  Output,
  OnDestroy,
  Component,
  EventEmitter,
} from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';

import { SectionWidgetItem } from '../../models/section-widget-item.model';

import {
  MOBILE_WINDOW_LIMIT,
  MOBILE_ACCOUNT_OVERVIEW_ITEMS,
} from '../../constants/account-items.const';

@Component({
  selector: 'app-section-widget-mobile',
  templateUrl: './section-widget-mobile.component.html',
  styleUrls: ['./section-widget-mobile.component.scss'],
})
export class SectionWidgetMobileComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() set items(value: Array<SectionWidgetItem>) {
    this.widgetItems = value;
    this.setGridCols(window.innerWidth);
  }

  @Output() buttonClicked: EventEmitter<string>;

  gridColums: number;
  widgetItems: Array<SectionWidgetItem>;

  private subscription$: Subscription;

  constructor() {
    this.subscription$ = new Subscription();
    this.buttonClicked = new EventEmitter<string>();
  }

  ngOnInit() {
    this.subscription$.add(
      fromEvent(window, 'resize').subscribe(() =>
        this.setGridCols(window.innerWidth)
      )
    );
  }

  setGridCols(windowSize: number) {
    this.gridColums =
      windowSize <= MOBILE_WINDOW_LIMIT
        ? MOBILE_ACCOUNT_OVERVIEW_ITEMS
        : this.widgetItems.length;
  }

  tileButtonOnClick(button: string): void {
    this.buttonClicked.emit(button);
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
