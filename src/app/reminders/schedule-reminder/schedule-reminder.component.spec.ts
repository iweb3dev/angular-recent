import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleReminderComponent } from './schedule-reminder.component';

describe('ScheduleReminderComponent', () => {
  let component: ScheduleReminderComponent;
  let fixture: ComponentFixture<ScheduleReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
