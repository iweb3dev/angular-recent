import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRecipientsComponent } from './print-recipients.component';

describe('PrintRecipientsComponent', () => {
  let component: PrintRecipientsComponent;
  let fixture: ComponentFixture<PrintRecipientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintRecipientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
