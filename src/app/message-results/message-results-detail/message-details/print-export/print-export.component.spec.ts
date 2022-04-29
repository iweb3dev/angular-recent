import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintExportComponent } from './print-export.component';

describe('PrintExportComponent', () => {
  let component: PrintExportComponent;
  let fixture: ComponentFixture<PrintExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
