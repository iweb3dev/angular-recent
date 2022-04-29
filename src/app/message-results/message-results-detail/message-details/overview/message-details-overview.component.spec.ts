import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsOverviewComponent } from './message-details-overview.component';

describe('MessageDetailsOverviewComponent', () => {
  let component: MessageDetailsOverviewComponent;
  let fixture: ComponentFixture<MessageDetailsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDetailsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
