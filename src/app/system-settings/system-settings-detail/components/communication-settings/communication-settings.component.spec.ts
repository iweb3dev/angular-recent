import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationSettingsComponent } from './communication-settings.component';

describe('CommunicationSettingsComponent', () => {
  let component: CommunicationSettingsComponent;
  let fixture: ComponentFixture<CommunicationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
