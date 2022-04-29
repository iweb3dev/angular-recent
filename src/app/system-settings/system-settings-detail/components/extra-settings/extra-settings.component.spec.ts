import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraSettingsComponent } from './extra-settings.component';

describe('ExtraSettingsComponent', () => {
  let component: ExtraSettingsComponent;
  let fixture: ComponentFixture<ExtraSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
