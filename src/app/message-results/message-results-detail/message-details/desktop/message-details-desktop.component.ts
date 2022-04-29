import { Component } from '@angular/core';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';

@Component({
  selector: 'app-message-details-desktop',
  templateUrl: './message-details-desktop.component.html',
  styleUrls: ['./message-details-desktop.component.scss']
})
export class MessageDetailsDesktopComponent {
  showRecipients$ = this._messageResultsDetailFacade.showMessageRecipients$;

  constructor(private _messageResultsDetailFacade: MessageResultsDetailFacade) {}
}
