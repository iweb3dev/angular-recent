/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmailSubscribeComponent } from './email-subscribe.component';

describe('EmailSubscribeComponent', () => {
  let component: EmailSubscribeComponent;
  let fixture: ComponentFixture<EmailSubscribeComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSubscribeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
