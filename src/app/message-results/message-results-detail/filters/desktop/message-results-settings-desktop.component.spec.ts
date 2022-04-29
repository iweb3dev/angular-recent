import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResultsSettingsDesktopComponent } from './message-results-settings-desktop.component';

describe('MessageResultsSettingsDesktopComponent', () => {
  let component: MessageResultsSettingsDesktopComponent;
  let fixture: ComponentFixture<MessageResultsSettingsDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResultsSettingsDesktopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResultsSettingsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
