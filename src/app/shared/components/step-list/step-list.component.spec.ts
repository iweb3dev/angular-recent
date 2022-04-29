import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepListComponent } from './step-list.component';

describe('CallInSettingsStepListComponent', () => {
  let component: StepListComponent;
  let fixture: ComponentFixture<StepListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
