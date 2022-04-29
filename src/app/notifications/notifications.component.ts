import { Component, OnInit } from '@angular/core';
import { NotificationsFacade } from '../core/store/features/notifications/notifications.facade';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private _notificationsFacade: NotificationsFacade) {}

  ngOnInit() {
    this._notificationsFacade.getAllNotifications();
  }

}
