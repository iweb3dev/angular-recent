import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { RouteNames } from 'src/app/shared/models/enums/route-names';

@Component({
  selector: 'app-current-route',
  templateUrl: './current-route.component.html',
  styleUrls: ['./current-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentRouteComponent {
  readonly RouteNames = RouteNames;

  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  currentRouteName: RouteNames;
}
