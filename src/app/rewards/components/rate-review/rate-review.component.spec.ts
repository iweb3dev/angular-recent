/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RateReviewComponent } from './rate-review.component';

describe('RateReviewComponent', () => {
  let component: RateReviewComponent;
  let fixture: ComponentFixture<RateReviewComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ RateReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RateReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
