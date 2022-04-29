import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
})
export class MobileHeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() mobileViewLmit = 768;
  @Input() showBackButton = false;

  @Output() goBack: EventEmitter<boolean>;
  @Output() closed: EventEmitter<boolean>;

  constructor() {
    this.goBack = new EventEmitter<boolean>();
    this.closed = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  public get isMobileView(): boolean {
    return window.innerWidth <= this.mobileViewLmit;
  }
  public cancelOnClick(): void {
    this.closed.emit(true);
  }

  public goBackOnClick(): void {
    if (this.showBackButton) {
      this.goBack.emit(true);
    }
  }
}
