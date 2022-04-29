import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input()
  disabled: boolean;

  @Input()
  title: string;

  @Input()
  icon: string;

  @Input()
  to: string;

  @Input()
  showTitle = true;

  @Output()
  menuItemClick = new EventEmitter<void>();
}
