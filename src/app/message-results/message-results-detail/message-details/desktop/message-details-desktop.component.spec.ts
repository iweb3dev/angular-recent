import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsDesktopComponent } from './message-details-desktop.component';

describe('MessageDetailsDesktopComponent', () => {
  let component: MessageDetailsDesktopComponent;
  let fixture: ComponentFixture<MessageDetailsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDetailsDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
