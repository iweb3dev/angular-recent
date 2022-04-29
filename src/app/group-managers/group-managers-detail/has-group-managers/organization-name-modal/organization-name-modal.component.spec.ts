import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationNameModalComponent } from './organization-name-modal.component';

describe('OrganizationNameModalComponent', () => {
  let component: OrganizationNameModalComponent;
  let fixture: ComponentFixture<OrganizationNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
