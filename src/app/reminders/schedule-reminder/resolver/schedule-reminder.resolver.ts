import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { GroupFacade } from 'src/app/core/store/features/groups/group.facade';
import { RemindersFacade } from 'src/app/core/store/features/reminders/reminders.facade';

@Injectable({ providedIn: 'root' })
export class ScheduleReminderResolver implements Resolve<any> {
  constructor(
    private _groupFacade: GroupFacade,
    private _remindersFacade: RemindersFacade,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    // Checks if data is already in store, fetch it from the api otherwise
    return combineLatest([
      this._groupFacade.allGroups$,
      this._remindersFacade.allReminders$,
    ]).pipe(
      take(1),
      tap((res) => {
        if (!res[0].length) {
          this._groupFacade.getAllGroups();
        }
        if (!res[1].length) {
          this._remindersFacade.fetchReminders();
        }
      }),
    );
  }
}
