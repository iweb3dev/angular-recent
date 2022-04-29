import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsePreviousDialogComponent } from './use-previous-dialog.component';

describe('UsePreviousDialogComponent', () => {
  let component: UsePreviousDialogComponent;
  let fixture: ComponentFixture<UsePreviousDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsePreviousDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsePreviousDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
