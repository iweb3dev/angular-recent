import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPromptComponent } from './help-prompt.component';

describe('HelpPromptComponent', () => {
  let component: HelpPromptComponent;
  let fixture: ComponentFixture<HelpPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
