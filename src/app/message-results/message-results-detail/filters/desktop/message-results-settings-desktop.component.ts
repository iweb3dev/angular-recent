import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-message-results-settings-desktop',
  templateUrl: './message-results-settings-desktop.component.html',
  styleUrls: ['./message-results-settings-desktop.component.scss']
})
export class MessageResultsSettingsDesktopComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { next: Subject<any> }) {}

  onClose() {
    this.data.next.next();
  }
}
