import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingFrameComponent } from './system-setting-frame.component';

describe('SystemSettingFrameComponent', () => {
  let component: SystemSettingFrameComponent;
  let fixture: ComponentFixture<SystemSettingFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
