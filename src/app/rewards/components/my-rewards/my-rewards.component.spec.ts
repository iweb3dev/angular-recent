/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyRewardsComponent } from './my-rewards.component';

describe('MyRewardsComponent', () => {
  let component: MyRewardsComponent;
  let fixture: ComponentFixture<MyRewardsComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MyRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
