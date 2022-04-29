import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsMobileComponent } from './message-details-mobile.component';

describe('MessageDetailsMobileComponent', () => {
  let component: MessageDetailsMobileComponent;
  let fixture: ComponentFixture<MessageDetailsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDetailsMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
