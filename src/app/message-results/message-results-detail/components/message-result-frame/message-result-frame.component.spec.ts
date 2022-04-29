import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResultFrameComponent } from './message-result-frame.component';

describe('MessageResultFrameComponent', () => {
  let component: MessageResultFrameComponent;
  let fixture: ComponentFixture<MessageResultFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResultFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResultFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
