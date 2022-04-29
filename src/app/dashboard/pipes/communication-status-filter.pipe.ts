import { Pipe, PipeTransform } from '@angular/core';

import { NotificationStatusTypes } from '@shared/models/enums/notification-status';

@Pipe({ name: 'communicationStatusFilter' })
export class CommunicationStatusFilterPipe implements PipeTransform {
  transform(statusLookupID: number): string {
    return Object.keys(NotificationStatusTypes)[
      Object.values(NotificationStatusTypes).indexOf(statusLookupID)
    ];
  }
}
