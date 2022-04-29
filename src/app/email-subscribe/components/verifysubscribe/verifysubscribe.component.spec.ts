/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerifysubscribeComponent } from './verifysubscribe.component';

describe('VerifysubscribeComponent', () => {
  let component: VerifysubscribeComponent;
  let fixture: ComponentFixture<VerifysubscribeComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ VerifysubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifysubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
