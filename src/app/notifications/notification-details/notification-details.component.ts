import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NotificationService } from './../../api/notifications/notifications.service';
import { UserNotification } from './../../api/notifications/notifications.models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationsFacade } from 'src/app/core/store/features/notifications/notifications.facade';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss']
})
export class NotificationDetailsComponent implements OnInit, OnDestroy {
  public allNotifications: UserNotification[];
  public displayedColumns: string[] = ['notification', 'insertedDateTime', 'notificationLookupID'];
  public isMobileView: boolean;

  private destroyed$ = new Subject<boolean>();

  constructor(
    private _notificationsFacade: NotificationsFacade,
    private _notificationsService: NotificationService) {}

  ngOnInit() {
    this.isMobileView = window.innerWidth <= 599 ? true : false;
    this._notificationsFacade.latestNotifications$
      .pipe(take(1))
      .subscribe((notifications: UserNotification[]) => {
        if (notifications) {
          this.allNotifications = notifications;
          this.updateNotificationsViewedStatus();
        }
      });
  }

  updateNotificationsViewedStatus() {
    this._notificationsService.deleteAllNotificationsAssignedToThisUser()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this._notificationsFacade.getAllNotifications();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
