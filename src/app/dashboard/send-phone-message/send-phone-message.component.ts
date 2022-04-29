import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-send-phone-message',
  templateUrl: './send-phone-message.component.html',
  styleUrls: ['./send-phone-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendPhoneMessageComponent {
  @Input() userIdNumber: string;
  @Input() callInNumber: string;

  private readonly guideLink =
    'https://www.callingpost.com/how-to-use-the-call-in-system.html';

  public downloadGuideOnClick(): void {
    window.open(this.guideLink, '_blank');
  }
}
