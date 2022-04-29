import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-list',
  templateUrl: './virtual-list.component.html',
  styleUrls: ['./virtual-list.component.scss'],
})
export class VirtualListComponent implements OnInit {
  @Input()
  dataSource: unknown[];

  @Input()
  columnDefinitions;

  constructor() {}

  ngOnInit(): void {}
}
