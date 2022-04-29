import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReminderComponent } from './review-reminder.component';

describe('ReviewReminderComponent', () => {
  let component: ReviewReminderComponent;
  let fixture: ComponentFixture<ReviewReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
