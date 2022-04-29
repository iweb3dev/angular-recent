import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNumberComponent } from './choose-number.component';

describe('ChooseNumberComponent', () => {
  let component: ChooseNumberComponent;
  let fixture: ComponentFixture<ChooseNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
