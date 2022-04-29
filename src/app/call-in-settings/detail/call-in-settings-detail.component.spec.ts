import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallInSettingsDetailComponent } from './call-in-settings-detail.component';

describe('CallInSettingsDetailComponent', () => {
  let component: CallInSettingsDetailComponent;
  let fixture: ComponentFixture<CallInSettingsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallInSettingsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallInSettingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
