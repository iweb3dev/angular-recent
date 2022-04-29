import { Component, Input, OnInit} from '@angular/core';
@Component({
  selector: 'app-menu-item-help',
  templateUrl: './menu-item-help.component.html',
  styleUrls: ['./menu-item-help.component.scss'],
})
export class MenuItemHelpComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  icon: string;

  @Input()
  showTitle = true;

  constructor() {}

  ngOnInit(): void {}
}
