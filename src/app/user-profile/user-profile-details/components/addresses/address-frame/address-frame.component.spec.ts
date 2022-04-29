import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFrameComponent } from './address-frame.component';

describe('AddressFrameComponent', () => {
  let component: AddressFrameComponent;
  let fixture: ComponentFixture<AddressFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
