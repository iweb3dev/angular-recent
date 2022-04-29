import { Component } from '@angular/core';
import { UserSessionService } from 'src/app/core/user-session/user-session.service';

@Component({
  selector: 'app-group-tabs',
  templateUrl: './group-tabs.component.html',
  styleUrls: ['./group-tabs.component.scss'],
})
export class GroupTabsComponent {
  public groupsCount: number;
  public membersCount: number;
  public isManager: boolean;

  constructor(public _userSessionService: UserSessionService) {
    this.isManager = this._userSessionService.isManager;
  }

  public membersCountOnEmit(count: number): void {
    this.membersCount = count;
  }

  public groupsCountOnEmit(count: number): void {
    this.groupsCount = count;
  }
}
