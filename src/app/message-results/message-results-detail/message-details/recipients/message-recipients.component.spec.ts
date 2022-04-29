import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRecipientsComponent } from './message-recipients.component';

describe('MessageRecipientsComponent', () => {
  let component: MessageRecipientsComponent;
  let fixture: ComponentFixture<MessageRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageRecipientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
