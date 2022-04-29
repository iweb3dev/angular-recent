import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-message-results-settings-mobile',
  templateUrl: './message-results-settings-mobile.component.html',
  styleUrls: ['./message-results-settings-mobile.component.scss']
})
export class MessageResultsSettingsMobileComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { next: Subject<any> }) {}

}
