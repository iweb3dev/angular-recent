import { Component } from '@angular/core';
import { MessageResultsDetailFacade } from '../../store/message-results-detail.facade';

@Component({
  selector: 'app-message-details-mobile',
  templateUrl: './message-details-mobile.component.html',
  styleUrls: ['./message-details-mobile.component.scss'],
})
export class MessageDetailsMobileComponent {
  showRecipients$ = this._messageResultsDetailFacade.showMessageRecipients$;

  constructor(
    private _messageResultsDetailFacade: MessageResultsDetailFacade,
  ) {}

  onCloseRecipients() {
    this._messageResultsDetailFacade.resetRecipients();
  }
}
