import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResultsSettingsComponent } from './message-results-settings.component';

describe('MessageResultsSettingsComponent', () => {
  let component: MessageResultsSettingsComponent;
  let fixture: ComponentFixture<MessageResultsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResultsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResultsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
