import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFrameComponent } from './email-frame.component';

describe('EmailFrameComponent', () => {
  let component: EmailFrameComponent;
  let fixture: ComponentFixture<EmailFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
