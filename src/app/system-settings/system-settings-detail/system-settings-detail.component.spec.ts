import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDetailComponent } from './system-settings-detail.component';

describe('SystemSettingsDetailComponent', () => {
  let component: SystemSettingsDetailComponent;
  let fixture: ComponentFixture<SystemSettingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
