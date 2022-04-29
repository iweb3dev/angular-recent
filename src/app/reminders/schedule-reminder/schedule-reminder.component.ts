import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { GroupFacade } from 'src/app/core/store/features/groups/group.facade';
import { RemindersFacade } from 'src/app/core/store/features/reminders/reminders.facade';
import { UserPhoneFacade } from 'src/app/core/store/features/user-phones/user-phones.facade';
import { UserFacade } from 'src/app/core/store/features/user/user.facade';
import { VerifyPhoneDialogService } from 'src/app/shared/components/verify-phone/services/verify-phone-dialog.service';
import { RepeatOptions } from 'src/app/shared/models/enums/reminder-repeat-options';
import { AppState } from 'src/app/store/app-state';
import { selectRouteParams } from 'src/app/store/router/router.selectors';
import { ReviewReminderService } from './service/review-reminder.service';
import { ScheduleReminderDateService } from './service/schedule-reminder-date.service';

@Component({
  selector: 'app-schedule-reminder',
  templateUrl: './schedule-reminder.component.html',
  styleUrls: ['./schedule-reminder.component.scss']
})
export class ScheduleReminderComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();
  repeatOptions = Object.keys(RepeatOptions)
  .filter(s => !isNaN(+s))
  .reduce((a, b) => {
    a[b] = RepeatOptions[b];
    return a;
  }, {});
  groups$ = this._groupFacade.allGroups$;
  phones$ = this._userPhoneFacade.allUserPhones$;
  callerIds$ = this._userFacade.callerIds$;
  form = new FormGroup({});
  isEdit = false;

  constructor(
    private _groupFacade: GroupFacade,
    private _userPhoneFacade: UserPhoneFacade,
    private _userFacade: UserFacade,
    private _remindersFacade: RemindersFacade,
    private _fb: FormBuilder,
    private _reviewReminderService: ReviewReminderService,
    private _scheduleReminderDateService: ScheduleReminderDateService,
    private _store: Store<AppState>,
    private _router: Router,
    private _verifyPhoneDialogService: VerifyPhoneDialogService) {}

  ngOnInit(): void {
    this.buildForm();
    this._store.select(selectRouteParams)
    .pipe(
      takeUntil(this._destroy$),
      tap(({reminderId}) => this.isEdit = +reminderId !== -1),
      switchMap(({ reminderId }) =>
      this._remindersFacade.getReminderById(reminderId)))
    .subscribe((res) => this.form.patchValue({
      ...res
    }));
  }

  private buildForm() {
    this.form = this._fb.group({
      reminderId: [],
      reminderName: ['', [Validators.required]],
      groupId: ['', [Validators.required]],
      phoneNumberToCall: ['', [Validators.required]],
      callerId: ['', [Validators.required]],
      startDateTime: ['', [Validators.required]],
      frequency: ['', [Validators.required]],
      frequencyDetails: []
    });

    this.form.get('frequency').valueChanges
    .pipe(takeUntil(this._destroy$))
    .subscribe(
      (value) => {
        if (+value !== 2) {
          this.form.get('frequencyDetails').patchValue('');
        } else {
          // Default value, we never allow this field to be empty so we don't have to add validation to it.
          this.form.get('frequencyDetails').patchValue('Monday');
        }
      }
    );
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.value;
    this.groups$.pipe(
      take(1),
      map(s => s.find(ss => formValue.groupId === ss.id).groupName))
      .subscribe(s => {
        const value = { ...this.form.value, startDateTime: this.form.get('startDateTime').value, groupName: s, isActive: true };
        this._reviewReminderService.open({
          ...value
        })
        .subscribe(res => {
          if (!res) { return; }

          if (this.isEdit) {
            this._remindersFacade.updateReminder(value);
            this._remindersFacade.onUpdateResolve()
              .subscribe(() =>  this._router.navigate(['./reminders']));
          } else {
            this._remindersFacade.createReminder(value);
            this._remindersFacade.onCreateResolve()
              .subscribe(() =>  this._router.navigate(['./reminders']));
          }
        });
      });
  }

  onAddPhoneNumber() {
    this._verifyPhoneDialogService.showVerifyPhoneDialog();
  }

  openDatePicker() {
    this._scheduleReminderDateService.openPicker()
    .subscribe((res) => this.form.get('startDateTime').patchValue(res.toISOString()));
  }

  compareRepeatOptions(t1: string, t2: number): boolean  {
    return +t1 === t2;
  }

  get repeateOptionsControl() {
    return this.form.get('frequency');
  }

  get dateTimeControl() {
    return this.form.get('startDateTime');
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
