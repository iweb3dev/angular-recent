import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LookupsFacade } from 'src/app/core/store/features/lookups/lookups.facade';

@Component({
  selector: 'app-no-reminders',
  templateUrl: './no-reminders.component.html',
  styleUrls: ['./no-reminders.component.scss']
})
export class NoRemindersComponent implements OnInit {
  steps = [
    'Set up your phone #’s that will need to receive the call to record and send messages to your members.',
    'The number that the reminder call will come from is 405-308-4474- We suggest storing this # in your phone contacts to easily recognize the call when it comes in.',
    'You can now give access to others or yourself to communicate to a specific group on a consistent basis without having to know your login credentials. All they need to do is answer the call and record the new message and send it out following the prompts.',
  ];
  callInNumber = this._lookupsFacade.getGlobalLookupSettingById('49')
  .pipe(tap((val) => {
    this.steps[1] = `Call ${val} from anywhere and any device. no internet connection required.`;
  }));
  constructor(private _lookupsFacade: LookupsFacade) {}

  ngOnInit(): void {
  }

}
