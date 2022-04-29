/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecoverUserIdComponent } from './recover-user-id.component';

describe('RecoverUserIdComponent', () => {
  let component: RecoverUserIdComponent;
  let fixture: ComponentFixture<RecoverUserIdComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverUserIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverUserIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
