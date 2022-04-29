import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneFrameComponent } from './phone-frame.component';

describe('PhoneFrameComponent', () => {
  let component: PhoneFrameComponent;
  let fixture: ComponentFixture<PhoneFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
