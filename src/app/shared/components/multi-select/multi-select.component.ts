import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MultiSelectOption } from './multi-select.models';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {
  @Input()
  label: string;

  @Input()
  options: MultiSelectOption[];

  @Input()
  placeholder?: string;

  @Output()
  value = new EventEmitter<MultiSelectOption[]>();

  selected: MultiSelectOption[];

  constructor() {
    this.selected = [];
  }

  options1 = [
    { value: 'test 1', label: 'test 1' },
    { value: 'test 2', label: 'test 2' },
    { value: 'test 3', label: 'test 3' },
    { value: 'test 4', label: 'test 4' },
  ];

  ngOnInit(): void {}

  onClick(e) {
    // console.info(e);
  }
}
