import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResultsSettingsMobileComponent } from './message-results-settings-mobile.component';

describe('MessageResultsSettingsMobileComponent', () => {
  let component: MessageResultsSettingsMobileComponent;
  let fixture: ComponentFixture<MessageResultsSettingsMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResultsSettingsMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResultsSettingsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
