import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallInSettingsStepListComponent } from './call-in-settings-step-list.component';

describe('CallInSettingsStepListComponent', () => {
  let component: CallInSettingsStepListComponent;
  let fixture: ComponentFixture<CallInSettingsStepListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallInSettingsStepListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallInSettingsStepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
