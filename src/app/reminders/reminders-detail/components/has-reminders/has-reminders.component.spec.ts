import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HasRemindersComponent } from './has-reminders.component';

describe('HasRemindersComponent', () => {
  let component: HasRemindersComponent;
  let fixture: ComponentFixture<HasRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HasRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HasRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
