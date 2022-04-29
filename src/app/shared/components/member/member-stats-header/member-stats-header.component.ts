import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-member-stats-header',
  templateUrl: './member-stats-header.component.html',
  styleUrls: ['./member-stats-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemberStatsHeaderComponent {
  @Input() activeTexts: number;
  @Input() totalMembers: number;
  @Input() activePhones: number;
  @Input() activeEmails: number;
  @Input() activeMembers: number;
}
