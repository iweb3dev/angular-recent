import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-in-settings-step-list',
  templateUrl: './call-in-settings-step-list.component.html',
  styleUrls: ['./call-in-settings-step-list.component.scss']
})
export class CallInSettingsStepListComponent implements OnInit {
  @Input()
  steps: string[] = [];
  constructor() {}

  ngOnInit(): void {
  }

}
