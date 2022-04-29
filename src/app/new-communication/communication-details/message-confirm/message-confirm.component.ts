import { ConvertTimeToTimeZone } from './../../../shared/pipes/convert-time-to-time-zone.pipe';
import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';

import { BuildCommuniationsQueue } from 'src/app/api/communications/communications.models';
import { PackageTypeIds } from 'src/app/api/shared/shared.enums';
import { MainUserInfoModel } from 'src/app/core/store/features/user/user.model';
import { CommunicationDetailsComponent } from './communication-details/communication-details.component';
import {
  ScheduleOptionsModel,
  ScheduleRepeatOptions,
} from './message-confirm.models';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-message-confirm',
  templateUrl: './message-confirm.component.html',
  styleUrls: ['./message-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageConfirmComponent implements OnInit {
  showScheduleOptions = new FormControl(false);

  @Output()
  scheduleMessage = new EventEmitter<{ isMobileView: boolean }>();

  @Output()
  updateCommunicationQueue = new EventEmitter<void>();

  @Input()
  userInfo: MainUserInfoModel;

  @Input()
  voiceMessageValid = false;

  @Input()
  emailMessageValid = false;

  @Input()
  textMessageValid = false;

  @Input()
  set communicationsQueue(queue: BuildCommuniationsQueue) {
    this._communicationsQueue = queue;
  }

  get communicationsQueue() {
    return this._communicationsQueue;
  }

  date: string;
  viewDate: string;
  repeatOptions: ScheduleRepeatOptions;

  @Input()
  set scheduleOptions(options: ScheduleOptionsModel) {
    if (!options) {
      this.date = this.createDisplayDate(moment.utc());
      this.viewDate = this.createDisplayDate(
        moment(
          new Date(
            this.convertTimeToTimeZone.transform(new Date(), 'startTimeLocal')
          )
        ).add(15, 'minutes')
      );

      this.repeatOptions = ScheduleRepeatOptions.NoRepeat;

      return;
    }

    this.date = undefined;
    this.date = this.createDisplayDate(moment.utc(options.date));
    this.viewDate = undefined;
    this.viewDate = this.createDisplayDate(options.date);
    this.repeatOptions = options.repeatOptions;
  }

  get upgradeRequired(): boolean {
    return this.userInfo.userCredits < this._communicationsQueue.neededBalance;
  }

  get isMobileView(): boolean {
    return window.innerWidth <= 959;
  }

  get hasValidMessage(): boolean {
    return (
      this.emailMessageValid || this.textMessageValid || this.voiceMessageValid
    );
  }

  get isOnUnlimited(): boolean {
    return (
      this.userInfo.package.packageTypeId === PackageTypeIds.Essentials ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Standard ||
      this.userInfo.package.packageTypeId === PackageTypeIds.Premium
    );
  }

  private _communicationsQueue: BuildCommuniationsQueue = {} as any;

  constructor(
    private _matDialog: MatDialog,
    private datePipe: DatePipe,
    private convertTimeToTimeZone: ConvertTimeToTimeZone
  ) {}

  ngOnInit(): void {}

  onShowDatePicker(): void {
    this.scheduleMessage.emit({ isMobileView: this.isMobileView });
  }

  viewCommunicationDetails(): void {
    this._matDialog
      .open(CommunicationDetailsComponent, {
        data: this.communicationsQueue,
        width: '535px',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe();
  }

  public toggle(event: MatSlideToggleChange) {
    if (event.checked) {
      this.onShowDatePicker();
    }
  }

  private createDisplayDate(date: moment.Moment): string {
    const displayDate = this.datePipe.transform(
      date.toString(),
      'MM/dd/yyyy h:mm:ss a',
      'en-En'
    );

    return displayDate;
  }
}
