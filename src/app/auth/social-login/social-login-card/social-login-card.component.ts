import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-social-login-card',
  templateUrl: './social-login-card.component.html',
  styleUrls: ['./social-login-card.component.scss'],
})
export class SocialLoginCardComponent {
  @Input() provider: string;
}
