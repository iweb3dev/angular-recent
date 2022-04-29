import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent {
  @Input()
  steps: string[] = [];

  constructor() {}

}
