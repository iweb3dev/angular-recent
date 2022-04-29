import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRemindersComponent } from './no-reminders.component';

describe('NoRemindersComponent', () => {
  let component: NoRemindersComponent;
  let fixture: ComponentFixture<NoRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
