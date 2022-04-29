import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepeatDetailComponent } from './repeat-detail.component';

describe('RepeatDetailComponent', () => {
  let component: RepeatDetailComponent;
  let fixture: ComponentFixture<RepeatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepeatDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepeatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
